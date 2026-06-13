import React from 'react'

const RepoDetailsSkeleton = () => {
    return (
        <div className="w-full mx-auto px-4 pb-4 pt-25 md:px-6 md:pb-6 bg-[#030712] text-slate-100 min-h-screen animate-pulse">
            
            {/* Header Skeleton */}
            <div className="mb-6">
                {/* Breadcrumb line */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-24 bg-slate-800 rounded"></div>
                    <div className="h-3 w-2 bg-slate-800 rounded"></div>
                    <div className="h-3 w-16 bg-slate-800 rounded"></div>
                </div>
                {/* Repo Title */}
                <div className="h-8 w-48 md:h-9 md:w-64 bg-slate-800 rounded-lg"></div>
            </div>

            {/* Split Panel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                {/* ------------- Left Section Skeleton ------------------ */}
                <div className="grid gap-2 grid-cols-1 xs:grid-cols-12 md:grid-cols-1 sm:col-span-4 lg:col-span-3">

                    {/* Languages Radar Card Skeleton */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm flex flex-col items-center xs:col-span-6 md:col-span-5">
                        <div className="w-full mb-4">
                            <div className="h-4 w-36 bg-slate-800 rounded mb-2"></div>
                            <div className="h-3 w-48 bg-slate-800 rounded"></div>
                        </div>
                        {/* Radar Chart */}
                        <div className="w-full h-54 flex items-center justify-center">
                            <div className="w-36 h-36 rounded-full border-4 border-dashed border-slate-800 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-800/50"></div>
                            </div>
                        </div>
                    </div>

                    {/* Contributors Card Skeleton */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm flex flex-col h-83 xs:col-span-6 md:col-span-5">
                        <div className="h-4 w-28 bg-slate-800 rounded mb-6"></div>
                        
                        {/* Contributor List Items */}
                        <div className="space-y-4 flex-1 overflow-hidden">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center justify-between py-1 px-2">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="h-8 w-8 rounded-full bg-slate-800"></div>
                                        {/* Username */}
                                        <div className="h-4 w-20 bg-slate-800 rounded"></div>
                                    </div>
                                    {/* Commit Stats */}
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="h-3 w-8 bg-slate-800 rounded"></div>
                                        <div className="h-2 w-10 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* --------- Right Section Skeleton --------- */}
                <div className="sm:col-span-8 lg:col-span-9 w-full">
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm min-h-[400px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-full bg-slate-800"></div>
                            <div className="space-y-2">
                                <div className="h-5 w-32 bg-slate-800 rounded"></div>
                                <div className="h-4 w-24 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-slate-800 rounded"></div>
                            <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                            <div className="h-4 w-4/5 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>

            </div >
        </div>
    )
}

export default RepoDetailsSkeleton