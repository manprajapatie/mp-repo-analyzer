import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { getSingleRepoDetails } from '../features/repos/singleRepoDetailsSlice'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RepoDetails = () => {

    //It will give us current Owner and Repo
    const { owner, repo, username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //access redux store data
    const { languages, repoContributors, loading } = useSelector((state) => state.repoDetails);


    //dispatching owner and repo details
    useEffect(() => {
        dispatch(getSingleRepoDetails({ owner, repo }));
    }, [dispatch, owner, repo]);

    //Loading and Error Handle
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    //handle click operation for navigate
    const handleRowClick = (contributor) => {
        navigate(`/repo/${owner}/${repo}/contributor/${contributor.login}`);
    };


    // Calculate Total Bytes
    const totalBytes = Object.values(languages || {}).reduce((a, b) => a + b, 0);

    // sorting array (highest to lowest)
    const sortedLanguages = Object.entries(languages || {})
        .map(([lang, value]) => ({ lang, value }))
        .sort((a, b) => b.value - a.value);

    // make Group if length exceeds 5
    let processedLanguages = [];
    if (sortedLanguages.length > 5) {
        const topFive = sortedLanguages.slice(0, 5);
        const othersValue = sortedLanguages.slice(5).reduce((sum, item) => sum + item.value, 0);

        processedLanguages = [
            ...topFive,
            { lang: "Others", value: othersValue }
        ];
    } else {
        processedLanguages = sortedLanguages;
    }



    //Map to final chart format with percentages
    const radarChartData = processedLanguages.map((item) => ({
        subject: item.lang,
        value: totalBytes ? parseFloat(((item.value / totalBytes) * 100).toFixed(1)) : 0,
    }));

    //Dynamic Padding: minimum 4 points to keep the chart Good Looking
    const MIN_POINTS = 4;
    if (radarChartData.length > 0 && radarChartData.length < MIN_POINTS) {
        const pointsNeeded = MIN_POINTS - radarChartData.length;
        for (let i = 0; i < pointsNeeded; i++) {
            radarChartData.push({
                subject: "-", // Blank label placeholder
                value: 0,     // 0% data share
            });
        }
    }

  


    return (
        <>
            <div className="w-full mx-auto px-4 pb-4 pt-25 md:px-6 md:pb-6 bg-[#030712] text-slate-100 ">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
                        <span>Repository Analyzer</span>
                        <span>/</span>
                        <span className="text-indigo-400 font-medium">{owner}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 mt-1">
                        {repo}
                    </h1>
                </motion.div>

                {/* Split The Panel, when sub-routes are mounted */}
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-start">

                    {/* ------------- Left Section: Repository Analytics Card --------------- */}
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 100, damping: 17 }}
                        className={'grid grid-cols-1 gap-6 lg:col-span-3'}
                    >

                        {/* Languages Section */}
                        {/* Languages Radar Section */}
                        <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm shadow-xl flex flex-col items-center">
                            <div className="w-full text-left mb-2">
                                <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Languages Distribution</h2>
                                <p className="text-[11px] text-slate-500 mt-0.5">Top 5 core languages vs stacked residuals</p>
                            </div>

                            {radarChartData.length === 0 ? (
                                <p className="text-xs text-slate-500 py-12">No language distribution metrics recorded</p>
                            ) : (
                                <div className="w-full h-64 mt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" radius="75%" data={radarChartData}>
                                            {/* Dark theme grid lines */}
                                            <PolarGrid stroke="#1e293b" />

                                            {/* X-Axis labels styled to match theme */}
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                                            />

                                            {/* Hidden radius axis lines */}
                                            <PolarRadiusAxis
                                                angle={30}
                                                domain={[0, 'auto']}
                                                tick={false}
                                                axisLine={false}
                                            />

                                            {/* Custom Dark Mode Tooltip */}
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#020617',
                                                    borderColor: '#1e293b',
                                                    borderRadius: '12px',
                                                    color: '#f8fafc',
                                                    fontSize: '11px',
                                                    fontFamily: 'monospace'
                                                }}
                                            />

                                            {/* Radar Glow Area */}
                                            <Radar
                                                name="Ecosystem Share"
                                                dataKey="value"
                                                stroke="#6366f1"
                                                fill="#06b6d4"
                                                fillOpacity={0.15}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>

                        {/* Contributors Section */}
                        <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm shadow-xl flex flex-col max-h-115">
                            <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-3">Contributors</h2>
                            <div className="overflow-y-auto pr-1 flex-1 
                                        scrollbar-thin
                                        [&::-webkit-scrollbar]:w-1.5
                                        [&::-webkit-scrollbar-track]:bg-transparent
                                        [&::-webkit-scrollbar-thumb]:bg-slate-800
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/40">
                                {repoContributors?.length === 0 ? (
                                    <p className="text-xs text-slate-500 p-2">No contributors profiles found</p>
                                ) : (
                                    <div className="divide-y divide-slate-900/60">

                                        {repoContributors?.map((contributor) => {
                                            const isSelected = username === contributor.login;
                                            return (
                                                <div key={contributor.id}
                                                    className={`flex items-center justify-between py-3 px-2 cursor-pointer rounded-xl transition-all duration-200 my-1 group
                                                    ${isSelected
                                                            ? 'bg-indigo-500/10 border border-indigo-500/30 text-slate-100'
                                                            : 'hover:bg-slate-800/30 border border-transparent text-slate-400 hover:text-slate-200'}`}
                                                    onClick={() => handleRowClick(contributor)}
                                                >
                                                    <div className="flex items-center gap-3 w-full justify-between">
                                                        <div className='flex items-center  gap-3'>
                                                            <img
                                                                src={contributor.avatar_url}
                                                                alt={contributor.login}
                                                                className={`h-8 w-8 rounded-full border bg-slate-950 transition-transform group-hover:scale-105
                                                            ${isSelected ? 'border-indigo-400' : 'border-slate-800'}`}
                                                            />

                                                            <div className="font-medium">
                                                                {contributor.login}
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0" >
                                                            <span className="font-mono text-xs block font-semibold text-slate-300">
                                                                {contributor.contributions}
                                                            </span>
                                                            <span className="text-[10px] uppercase text-slate-500 tracking-wider block">Commits</span>
                                                            <div />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </motion.div>


                    {/* --------- Right Section: This will Load Contributor Details Without Changing Page */}
                    
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 100, damping: 18 }}
                            className="lg:col-span-8 w-full">
                            <Outlet />
                        </motion.div>

                </div >
            </div >

        </>
    )
}

export default RepoDetails
