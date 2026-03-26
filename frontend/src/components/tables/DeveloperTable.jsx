import React from "react";

const DeveloperTable = ({ developers }) => {
    return (
        <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">
                Top Developers
            </h2>

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th>Developer</th>
                        <th>PR Count</th>
                    </tr>
                </thead>

                <tbody>
                    {developers.map((dev, index) => (
                        <tr key={index} className="border-b">
                            <td>{dev.user}</td>
                            <td>{dev.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeveloperTable;