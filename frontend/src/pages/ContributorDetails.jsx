import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../features/userdetails/userdetailsSlice';

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

          {data?.map((item) => (

            < div
              key={item.sha}
              className='border p-4 rounded-lg shadow'
            >

              <h2 className='font-semibold text-lg'> {item?.commit?.message || 'No commit message'}</h2>
              <p>SHA: {item.sha} </p>
              <p> Author: {item?.commit?.author?.name || 'Unknown Author'} </p>
              <p>
                Date:
                {" "}
                {
                  item?.commit?.author?.date
                    ? new Date(
                      item.commit.author.date
                    ).toLocaleString()
                    : "No Date"
                }
              </p>

            </div>

          ))}

        </div>

      </div >
    </>
  )
}

export default ContributorDetails
