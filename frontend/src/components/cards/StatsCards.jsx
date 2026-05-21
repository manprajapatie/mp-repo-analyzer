import React from 'react'
import { motion } from 'motion/react'

//const StatsCards = ({ org, repos, teams, prVelocity }) => {
const StatsCards = ({ org, repos, prVelocity }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4"
            >

                <Card
                    title="Organization"
                    value={org?.login || "-"}
                    subtitle={`Public Repos: ${org?.public_repos || 0}`}
                    accentColor="from-indigo-500 to-indigo-400"
                />

                <Card
                    title="Repositories"
                    value={repos.length || 0}
                    subtitle="Monitored Ecosystems"
                    accentColor="from-cyan-500 to-cyan-400"
                />


                {/* <Card title="Teams" value={teams.length} /> */}

                <Card
                    title="PR Velocity"
                    value={`${(prVelocity ?? 0).toFixed(1)} days`}
                    subtitle="Average Merge Window"
                    accentColor="from-rose-500 to-rose-400"
                />
            </motion.div>
        </>
    )
}
const Card = ({ title, value, subtitle, accentColor, icon }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' }
        }
    }
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.25)' }}
            className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 p-5 backdrop-blur-sm shadow-xl transition-colors duration-300"
        >
            {/* Upper Layout: Label and Icon */}
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
                <div className="p-2 bg-slate-800/40 rounded-xl border border-slate-800/60">
                    {icon}
                </div>

            </div>

            {/* Main Metric Focus */}
            <div className="mt-4 flex items-baseline gap-x-2">
                <p className="text-xl font-bold">{value}</p>
            </div>

            {/* Decorative contextual text metadata */}
            <p className="mt-1 text-xs text-slate-400 font-medium">
                {subtitle}
            </p>

            {/* Subtle Bottom Light Injection bar to link branding style */}
            <div className={`absolute bottom-0 inset-x-0 h-0.5 bg-linear-to-r ${accentColor} opacity-20`} />
        </motion.div>
    );
}


export default StatsCards
