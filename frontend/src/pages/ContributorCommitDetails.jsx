import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fetchUserDetails } from '../features/userdetails/userdetailsSlice';
import { fetchCommitDetails } from '../features/commitDetails/commitDetailsSlice';
import CommitViewer from '../components/commit/CommitViewer';

const ContributorCommitDetails = () => {

  const { owner, repo, username } = useParams();

  const dispatch = useDispatch();

  // Mobile state to see if the overlapping commit selector drawer is actively open
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDetails({ owner, repo, username }));
  }, [dispatch, owner, repo, username]);

  const { data, loading, error, currentUser } = useSelector(
    (state) => state.userDetails
  );

  // get currently loaded single commit data to see if a commit is active
  const { selectedCommit, loading: commitLoading } = useSelector(
    (state) => state.commitDetails || {}
  );

  // to know if a commit has been chosen yet
  const hasSelectedCommit = !!selectedCommit;

  // Find active commit message metadata to display on the mobile header selector card
  const activeCommitMessage = data?.find(c => c.sha === selectedCommit?.sha)?.commit?.message || "Select a commit...";


  if (loading) {
    return (<div className="flex items-center justify-center min-h-75">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>)
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
        <p>{error}</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-slate-900 bg-slate-950/20 text-slate-500">
        <p>No recorded commits available for this contributor</p>
      </div>
    );
  }

  const handleCommitSelect = (sha) => {
    dispatch(fetchCommitDetails({ owner, repo, sha }));
    setIsDrawerOpen(false); // Close mobile overlap drawer view on selection
  };

  return (
    <>
      <div className='w-full text-slate-200'>

        {/* Dynamic Section Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <span className="text-indigo-400 font-mono text-base font-normal">@</span>
            {username || currentUser}'s Contributions
          </h1>
        </div>


       


          {/* Main structural : wrapper Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative items-start">

            {/* ------------------------ Commit list sidebar------------------ */}

            <div className={`md:col-span-5 lg:col-span-4 w-full z-30 
            ${hasSelectedCommit ? 'absolute top-0 left-0 right-0 md:relative' : 'relative'}`}
            >
              {/* for Mobile: The active header row button to change a commit choice */}
              {hasSelectedCommit && (
                <div className="md:hidden w-full mb-3">
                  <button
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-left transition-all hover:bg-indigo-500/15"
                  >
                    <div className="truncate pr-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-0.5">Active Commit Context</span>
                      <span className="text-xs font-medium text-slate-200 block truncate">{activeCommitMessage}</span>
                    </div>
                    <span className="text-xs text-indigo-400 font-medium shrink-0 bg-slate-950/60 px-2 py-1 rounded-md border border-slate-800">
                      {isDrawerOpen ? 'Close' : 'Change'}
                    </span>
                  </button>
                </div>
              )}

              {/* Animated Container for list view */}
              <AnimatePresence initial={false}>
                {(!hasSelectedCommit || isDrawerOpen || window.innerWidth >= 768) && (
                  <motion.div
                    initial={hasSelectedCommit ? { opacity: 0, y: -12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={hasSelectedCommit ? { opacity: 0, y: -12 } : undefined}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`rounded-2xl border border-slate-900 bg-slate-950 p-3 shadow-2xl flex flex-col 
                  ${hasSelectedCommit ? 'shadow-indigo-950/20 border-indigo-500/20 md:border-slate-900 md:bg-slate-900/20' : 'bg-slate-900/20'} 
                  ${hasSelectedCommit && isDrawerOpen ? 'max-h-90' : 'max-h-125'}`}
                  >
                    <div className="px-2 pb-2 border-b border-slate-900 flex justify-between items-center">
                      <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Select History Node</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{data.length} total</span>
                    </div>

                    {/* Fixed height view bounding box containing approximately 8-9 scrollable line items */}
                    <div className="overflow-y-auto mt-2 pr-1 space-y-1 flex-1 scrollbar-thin
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-slate-800
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/30"
                    >
                      {data.map((item) => {
                        const isCurrentSha = selectedCommit?.sha === item.sha;
                        return (
                          <motion.div
                            key={item.sha}
                            whileHover={{ x: 2 }}
                            onClick={() => handleCommitSelect(item.sha)}
                            className={`p-3 cursor-pointer rounded-xl transition-all duration-200 border text-left group
                          ${isCurrentSha
                                ? 'bg-indigo-500/10 border-indigo-500/40 text-slate-100'
                                : 'bg-transparent border-transparent hover:bg-slate-800/30 text-slate-400 hover:text-slate-200'
                              }`}
                          >
                            <div className="flex flex-col gap-1.5">
                              <h2 className="text-xs font-medium leading-relaxed line-clamp-2 text-slate-300 group-hover:text-slate-100">
                                {item.commit.message}
                              </h2>
                              <div className="flex items-center justify-between gap-2 mt-0.5">
                                <span className="font-mono text-[10px] text-slate-500 tracking-tight block">
                                  {item.sha.substring(0, 7)}
                                </span>
                                {item.commit.committer?.date && (
                                  <span className="text-[10px] text-slate-500 block">
                                    {new Date(item.commit.committer.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>



          

          {/*------- Show Commit */}
          <div className={`md:col-span-7 lg:col-span-8 w-full transition-all duration-300
          ${hasSelectedCommit ? 'pt-19 md:pt-0 block' : 'hidden md:block'}`}
          >
            {hasSelectedCommit ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <CommitViewer />
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center flex flex-col items-center justify-center min-h-75">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center text-sm font-mono mb-3">
                  $_
                </div>
                <h3 className="text-sm font-semibold text-slate-400">No Commit Selected</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Pick a branch history link node from the log feed timeline array to review granular code changes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  )
}

export default ContributorCommitDetails
