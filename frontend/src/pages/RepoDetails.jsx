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
    if (error) return <p>Error: {error}</p>;

    // // Convert languages > percentage
    const totalBytes = Object.values(languages || {}).reduce((a, b) => a + b, 0);

    const languageData = Object.entries(languages || {}).map(([lang, value]) => ({
        lang,
        percent: totalBytes ? ((value / totalBytes) * 100).toFixed(1) : 0
    }));


    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                {owner} / {repo}
            </h1>

        </>
    )
}

export default RepoDetails
