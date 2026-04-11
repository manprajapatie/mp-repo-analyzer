import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RepoTable = ({ repos }) => {
    const navigate = useNavigate();
    const orgFromSearch = useSelector((state) => state.search)
    //if orgFromSearch have data(that name in reducer query) show it otherwise show default value
    const org = orgFromSearch?.query || "facebook";

    const handleRowClick = (repo) => {
        navigate(`/repo/${org}/${repo.name}`);
    };
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
                    {/* Not using slice for now will use it later */}
                    {repos.slice().map((repo) => (
                        <tr key={repo.id} className="border-b"
                            onClick={() => handleRowClick(repo)}
                        >
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