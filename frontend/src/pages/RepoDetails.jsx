import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleRepoDetails } from '../features/repos/singleRepoDetailsSlice'

const RepoDetails = () => {

    const { owner, repo } = useParams();
    const dispatch = useDispatch();

    //access redux store data
    const { languages, repoContributors, loading } = useSelector((state) => state.repoDetails);


    //dispatching owner and repo details
    useEffect(() => {
        dispatch(getSingleRepoDetails({ owner, repo }));
    }, [dispatch, owner, repo]);

    //Loading and Error Handle
    if (loading) return <p>Loading...</p>;


    // // Convert languages > percentage
    const totalBytes = Object.values(languages || {}).reduce((a, b) => a + b, 0);

    const languageData = Object.entries(languages || {}).map(([lang, value]) => ({
        lang,
        percent: totalBytes ? ((value / totalBytes) * 100).toFixed(1) : 0
    }));


    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-6">
                    {owner} / {repo}
                </h1>

                {/* Languages Section */}
                <div className="bg-white shadow rounded-2xl p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Languages</h2>
                    {languageData.length === 0 ? (
                        <p>No language data</p>
                    ) : (
                        languageData.map((item, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.lang}</span>
                                    <span>{item.percent}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Contributors Section */}
                <div className="bg-white shadow rounded-2xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Contributors</h2>
                    {repoContributors?.length === 0 ? (
                        <p>No contributors found</p>
                    ) : (
                        <ul className="space-y-3">
                            {repoContributors?.map((contributor) => (
                                <li
                                    key={contributor.id}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={contributor.avatar_url}
                                        alt={contributor.login}
                                        className="h-2 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{contributor.login}</p>
                                        <p className="text-sm text-gray-500">
                                            Contributions: {contributor.contributions}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </>
    )
}

export default RepoDetails
