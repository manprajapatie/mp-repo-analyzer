import React from 'react'
//const StatsCards = ({ org, repos, teams, prVelocity }) => {
const StatsCards = ({ org, repos, prVelocity }) => {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card title="Organization" value={org?.login || "-"} />
                <Card title="Repositories" value={repos.length} />
                {/* <Card title="Teams" value={teams.length} /> */}
                <Card title="PR Velocity" value={prVelocity.toFixed(2)} />
            </div>
        </>
    )
}
const Card = ({ title, value }) => (
    <div className="bg-white shadow rounded-xl p-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
    </div>
);
export default StatsCards
