import React from 'react'
import { useSelector } from "react-redux";

const CommitViewer = () => {

    const {
        selectedCommit,
        loading
    } = useSelector(
        (state) => state.commitDetails
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!selectedCommit) {

        return (

            <div className="h-full flex items-center justify-center">

                <h1 className="text-3xl text-gray-400">
                    Select a commit
                </h1>

            </div>

        );
    }

    return (

        <div>

            <h1 className="text-2xl font-bold mb-6">
                Changed Files
            </h1>

            {selectedCommit.files?.map((file) => (

                <div
                    key={file.filename}
                    className="mb-8 border rounded-lg"
                >

                    <div className="p-3 border-b">

                        <h2>{file.filename}</h2>

                        <p>
                            +{file.additions}
                            {" "}
                            -{file.deletions}
                        </p>

                    </div>

                    <pre className="p-4 overflow-auto text-sm">

                        {file.patch}

                    </pre>

                </div>

            ))}

        </div>
    );
};

export default CommitViewer;