import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const RepoTable = ({ repos }) => {
    const navigate = useNavigate();
    const orgFromSearch = useSelector((state) => state.search)
    //if orgFromSearch have data(that name in reducer query) show it otherwise show default value
    const org = orgFromSearch?.query || "facebook";


    const handleNavigation = (repoName) => {
        navigate(`/repo/${org}/${repoName}`);
    };

    const handleBarClick = (state) => {
        if (state && state.activePayload) {
            const clickedRepoName = state.activePayload[0].payload.name;
            handleNavigation(clickedRepoName);
        }
    };

    // width calculator for horizontal chart scroll
    const minBarWidth = 80;
    const calculatedChartWidth = Math.max(repos.length * minBarWidth, 600);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch w-full">

            <div className="lg:col-span-1 rounded-2xl border border-slate-900 bg-slate-900/40 p-4 backdrop-blur-sm shadow-xl flex flex-col h-109">
                <div className="mb-3">
                    <h2 className="text-base font-semibold text-slate-100 tracking-tight">Repositories</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">Quick selection index</p>
                </div>

                {/* Scrollable Table Container*/}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-[#0b1324] z-10 shadow-[0_1px_0_0_#1e293b]">
                            <tr className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                <th className="pb-2 pt-1 pl-2">Name</th>
                                <th className="pb-2 pt-1 text-right">Stars</th>
                                <th className="pb-2 pt-1 pr-2 text-right">Forks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-xs">
                            {repos.map((repo) => (
                                <tr
                                    key={repo.id}
                                    onClick={() => handleNavigation(repo.name)}
                                    className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 cursor-pointer transition-colors group"
                                >
                                    <td className="py-3 pl-2 font-medium truncate max-w-27.5 text-slate-300 group-hover:text-indigo-400">
                                        {repo.name}
                                    </td>
                                    <td className="py-3 text-right font-mono text-[11px]">
                                        {/* Normalize the Higher Number */}
                                        {repo.stargazers_count >= 1000
                                            ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
                                            : repo.stargazers_count}
                                    </td>
                                    <td className="py-3 pr-2 text-right font-mono text-[11px] text-slate-500">
                                        {repo.forks_count >= 1000
                                            ? `${(repo.forks_count / 1000).toFixed(1)}k`
                                            : repo.forks_count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Horizontal Scroll Chart */}
            {/* RIGHT PANEL: The Analytics Bar Chart (Takes 3/4 width on desktop) */}
            <div className="lg:col-span-3 rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm shadow-xl flex flex-col justify-between h-109">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
                            Repository Performance Metrics
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Logarithmic view of Stars vs. Forks. Click any element to drill down.
                        </p>
                    </div>

                    {/* Dynamic scroll */}
                    {repos.length * minBarWidth > 600 && (
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono px-2 py-0.5 rounded-full animate-pulse">
                            Swipe Chart to Scroll
                        </span>
                    )}
                </div>

                {/* Horizontal Scroll Chart Canvas */}
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800 pb-1">
                    <div style={{ width: `${calculatedChartWidth}px`, height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={repos}
                                onClick={handleBarClick}
                                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                                className="cursor-pointer"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    fontSize={11}
                                    tickLine={false}
                                    dy={10}
                                />

                                <YAxis
                                    scale="log"
                                    domain={[1, 'auto']}
                                    stroke="#64748b"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#020617',
                                        borderColor: '#1e293b',
                                        borderRadius: '12px',
                                        color: '#f8fafc',
                                        fontSize: '12px'
                                    }}
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                />

                                <Legend
                                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                    iconType="circle"
                                />

                                <Bar
                                    name="Stars"
                                    dataKey="stargazers_count"
                                    fill="url(#indigoGradient)"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={32}
                                />

                                <Bar
                                    name="Forks"
                                    dataKey="forks_count"
                                    fill="url(#cyanGradient)"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={32}
                                />

                                <defs>
                                    <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.3} />
                                    </linearGradient>
                                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#0891b2" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoTable;