import React from 'react'
import { motion } from 'motion/react'
import Searchbar from '../features/search/Searchbar'


const Home = () => {


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  // Sample data for Section 3 (Feature Boxes)
  const features = [
    {
      title: "Real-time Repo Stats",
      desc: "Track lines of code, commit frequencies, and active branch developments instantly.",
      icon: "1"
    },
    {
      title: "In-depth Performance Analysis",
      desc: "Get automated scorecards assessing structural health, complexity, and documentation coverage.",
      icon: "2"
    },
    {
      title: "Automated Reporting",
      desc: "Generate clean PDF or markdown performance digests perfect for stakeholders and teams.",
      icon: "3"
    },
    {
      title: "Organization Tracking",
      desc: "Benchmark multi-contributor velocity and pull request lead times across your entire ecosystem.",
      icon: "4"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">

      {/* -------------------SECTION 1: Hero Container */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative mx-auto lg:max-w-5xl md:max-w-3xl xs:max-w-140 max-w-5xl px-6 pt-26 pb-24 text-center sm:pt-32 lg:px-8 border-solid border-2 border-amber-50"
      >
        {/* Glow Effects in Background */}
        <div className="absolute top-0 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-20 left-1/3 -z-10 h-62.5 w-100 bg-cyan-500/5 blur-[100px] rounded-full" />

        {/* Animated App Name */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.1
          }}
          className=" font-extrabold tracking-tight text-[1.5rem] xs:text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl">
          Optimize Your GitHub with <br />
          <motion.span
            animate={{
              backgroundImage: [
                "linear-gradient(to right, #818cf8, #38bdf8)",
                "linear-gradient(to right, #34d399, #818cf8)",
                "linear-gradient(to right, #818cf8, #38bdf8)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400"
          >
            MP Repo Analyzer
          </motion.span>
        </motion.h1>


        {/* Work Description */}
        <motion.p
          variants={sectionVariants}
          className="mx-auto mt-6 max-w-2xl text-[0.8rem] sm:text-[1rem] lg:text-lg lg:leading-8 sm:leading-6 leading-5  text-slate-400"
        >
          An elite performance analytics layer built for developers, teams, and organizations.
          Deep dive into repository architectures, trace contributor velocities, and extract
          actionable codebase insights natively.
        </motion.p>

        {/* SearchBar */}
        <motion.div variants={sectionVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-400"
        >
          <Searchbar />
        </motion.div>


        {/* Buttons */}
        <motion.div
          variants={sectionVariants}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-indigo-600 px-6 py-2.5 sm:text-sm text-[0.7rem] font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Work
          </motion.button>


          {/* Performance Metrics Button */}
          <button
            className="sm:text-sm text-[0.7rem] font-semibold leading-6 text-slate-300 hover:text-white transition-colors"
            onClick={() => document.getElementById('section-3')?.scrollIntoView({ behavior: 'smooth' })}
          >
            performance Metrics
          </button>
        </motion.div>
      </motion.section>


      {/* -----------------SECTION 2: Code Image Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        id="section-2"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8 border-t border-slate-900"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-200 sm:text-3xl">Explore Our Work</h2>
          <p className="mt-2 text-sm text-slate-400">Advanced diagnostic profiles created straight from source data.</p>
        </div>

        {/* 4 Image Containers acting as visual "code snapshots" */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              variants={sectionVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative aspect-4/3 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40 p-2 backdrop-blur-sm"
            >
              {/* Top Window Dots Simulation */}
              <div className="flex gap-1.5 mb-2 px-2 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>

              {/* Inner content placeholder for Code / Data Graphics */}
              <div className="w-full h-[calc(100%-20px)] rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-center p-4 relative group-hover:border-indigo-500/30 transition-colors">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Abstract graphic lines substituting hardcoded code images */}
                <div className="w-full space-y-2 opacity-40 group-hover:opacity-60 transition-opacity font-mono text-[10px] text-cyan-400">
                  <p className="text-indigo-400">import {'{ audit }'} from 'mp-analyzer'</p>
                  <p className="pl-2 text-slate-400">const performance = await audit(repoUrl);</p>
                  <p className="pl-2 text-emerald-400">if (performance.score &gt; 90) {'{'}</p>
                  <p className="pl-4 text-amber-400">console.log("Codebase is stable.");</p>
                  <p className="pl-2 text-emerald-400">{'}'}</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-5 text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                {item === 1 && "Contribution Metrics"}
                {item === 2 && "Commit Analysis"}
                {item === 3 && "PR Activity Logs"}
                {item === 4 && "Org Performance"}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* ---------- SECTION 3: Detail Information Boxes*/}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        id="section-3"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 border-t border-slate-900"
      >
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Powerful Insights</h2>
          <p className="mt-4 text-lg text-slate-400">Everything you need to understand performance metrics at scale.</p>
        </div>

        {/* Feature Boxes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={sectionVariants}
              whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}
              className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-sm shadow-xl transition-colors duration-300"
            >
              <div className="text-2xl mb-4 bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center border border-slate-700/50">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold leading-7 text-slate-200">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  )
}

export default Home