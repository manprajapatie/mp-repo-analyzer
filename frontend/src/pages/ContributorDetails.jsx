import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../features/userdetails/userdetailsSlice';
import { fetchCommitDetails } from '../features/commitDetails/commitDetailsSlice';
import CommitViewer from '../components/commit/CommitViewer';

const ContributorDetails = () => {

  const { owner, repo, username } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails({ owner, repo, username }));
  }, [dispatch, owner, repo, username]);

  const { data, loading, error, currentUser } = useSelector(
    (state) => state.userDetails
  );


  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!data) {
    return (
      <div className="p-5 text-center text-gray-400">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <>
      <div className='p-5'>

        <h1 className='text-2xl font-bold mb-5'>
          {currentUser} Commits
        </h1>

        <div className='space-y-4'>


          {/* LEFT SIDE */}
          <div className="col-span-4 border-r overflow-y-auto p-4">

            {data?.map((item) => (
              <div
                key={item.sha}
                onClick={() =>
                  dispatch(
                    fetchCommitDetails({
                      owner,
                      repo,
                      sha: item.sha
                    })
                  )
                }
                className="border p-4 mb-4 cursor-pointer rounded-lg"
              >
                <h2>
                  {item.commit.message}
                </h2>
              </div>

            ))}

          </div>

          {/*------- Show Commit */}
          <CommitViewer />

        </div>
      </div >
    </>
  )
}

export default ContributorDetails
