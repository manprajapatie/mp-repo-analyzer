import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const CommitViewer = () => {

    const {
        selectedCommit,
        loading
    } = useSelector(
        (state) => state.commitDetails
    );

    // Active file pagination control state
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 1; // Showing 1 file card per page keeps the UI incredibly clean

    // Reset page view back to index 1 if the user switches to a completely different commit node
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCommit?.sha]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-50">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!selectedCommit) {

        return (

            <div className="h-full flex items-center justify-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-950/20">

                <h1 className="text-xl font-medium text-slate-500 tracking-tight">
                    Select a commit to view file diffs
                </h1>

            </div>

        );
    }

    const totalFiles = selectedCommit.files?.length || 0;
    const totalPages = Math.ceil(totalFiles / filesPerPage);

    // Slice out the single file targeted for the active page index matrix
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = selectedCommit.files?.slice(indexOfFirstFile, indexOfLastFile) || [];

    // function to break down the git code text line by line with syntax highlighting colors
    const renderPatchLines = (patchText) => {
        if (!patchText) return <p className="text-xs text-slate-500 p-4 font-mono">No patch modifications recorded for this file binary.</p>;

        return patchText.split('\n').map((line, index) => {
            let rowStyles = "text-slate-400 bg-transparent border-transparent";

            if (line.startsWith('+') && !line.startsWith('+++')) {
                rowStyles = "bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500";
            } else if (line.startsWith('-') && !line.startsWith('---')) {
                rowStyles = "bg-rose-500/10 text-rose-300 border-l-2 border-rose-500";
            } else if (line.startsWith('@@')) {
                rowStyles = "bg-indigo-950/40 text-indigo-400 font-medium tracking-wide border-y border-slate-900/60 my-1";
            }

            return (
                <div
                    key={index}
                    className={`flex font-mono text-[11px] leading-6 px-4 whitespace-pre transition-colors duration-150 hover:bg-slate-800/20 ${rowStyles}`}
                >
                    {/* Line Index Number */}
                    <span className="w-8 shrink-0 select-none text-[10px] text-slate-600 font-sans text-right pr-3 border-r border-slate-900/60 mr-3">
                        {index + 1}
                    </span>
                    {/* Code payload */}
                    <span className="flex-1">{line}</span>
                </div>
            );
        });
    };

    return (

        <div className='space-y-4 w-full max-w-full overflow-hidden'>

            {/* --------------------- Header with Pagination ----------- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-100">
                        Changed File Tree Nodes
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Repository contains {totalFiles} modified target {totalFiles === 1 ? 'file' : 'files'}
                    </p>
                </div>

                {/* Header Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900 self-start sm:self-auto">
                        {/* Prev Arrow Button */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="p-1.5 rounded-lg border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all text-xs font-semibold cursor-pointer disabled:cursor-default"
                        >
                            &larr;
                        </button>

                        {/* Numerical Select Buttons */}
                        <div className="flex items-center gap-1 max-w-40 xs:max-w-60 overflow-x-auto no-scrollbar py-0.5 px-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md transition-all duration-150 shrink-0 cursor-pointer
                                        ${currentPage === pageNumber
                                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>

                        {/* Next Arrow Button */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="p-1.5 rounded-lg border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all text-xs font-semibold cursor-pointer disabled:cursor-default"
                        >
                            &rarr;
                        </button>
                    </div>
                )}
            </div>

            {/* ---------------------- Repo modified Files ---------------------- */}
            <div className="space-y-4">
                {currentFiles.map((file) => (
                    <div
                        key={file.filename}
                        className="overflow-hidden rounded-xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm shadow-xl flex flex-col"
                    >
                        {/* File Card Title Subheader info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-slate-950 border-b border-slate-900 sticky top-0 z-10">
                            <div className="flex items-center gap-2.5 truncate">
                                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0 select-none text-xs font-mono">
                                    &lt;/&gt;
                                </div>
                                <h2 className="text-xs font-medium font-mono text-slate-200 truncate tracking-tight">
                                    {file.filename}
                                </h2>
                            </div>

                            {/* Diff Style */}
                            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 font-mono text-[11px]">
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                                    +{file.additions}
                                </span>
                                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md font-semibold">
                                    -{file.deletions}
                                </span>
                            </div>
                        </div>

                        {/* Scrollable Git Diff Lines */}
                        <div className="overflow-auto bg-slate-950/60 py-2 max-h-110 scrollbar-thin
                            [&::-webkit-scrollbar]:h-1.5
                            [&::-webkit-scrollbar]:w-1.5
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:bg-slate-800
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/20"
                        >
                            <div className="min-w-full inline-block align-middle">
                                {renderPatchLines(file.patch)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommitViewer;