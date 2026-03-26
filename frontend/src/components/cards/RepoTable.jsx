import React from "react";

const RepoTable = ({ repos }) => {
    return (
        <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Repositories</h2>

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th>Name</th>
                        <th>Stars</th>
                        <th>Forks</th>
                    </tr>
                </thead>

                <tbody>
                    {repos.slice(0, 10).map((repo) => (
                        <tr key={repo.id} className="border-b">
                            <td>{repo.name}</td>
                            <td>{repo.stargazers_count}</td>
                            <td>{repo.forks_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RepoTable;