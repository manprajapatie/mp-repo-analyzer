import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Dynamic smooth scrolling for local section links
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 overflow-hidden">
      {/* Bottom Subtle Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-64 w-120 -translate-x-1/2 bg-indigo-500/5 blur-[100px] rounded-full" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">

          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20">
                MP
              </div>
              <span className="text-lg font-bold text-slate-100 tracking-tight">
                Repo <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400">Analyzer</span>
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-400 max-w-md">
              An elite performance analytics layer built for developers, teams, and organizations to extract deep, actionable codebase insights natively.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-x-4 pt-2">
              {['github', 'twitter', 'linkedin'].map((platform) => (
                <motion.a
                  key={platform}
                  whileHover={{ y: -2, text: '#f1f5f9' }}
                  href={`#${platform}`}
                  className="text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  [{platform}]
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-200 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <button onClick={() => handleScroll('section-2')} className="text-sm hover:text-indigo-400 transition-colors text-left">
                      Explore Work
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleScroll('section-3')} className="text-sm hover:text-indigo-400 transition-colors text-left">
                      Performance Metrics
                    </button>
                  </li>
                  <li>
                    <a href="#features" className="text-sm hover:text-indigo-400 transition-colors">Core Features</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-slate-200 tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#docs" className="text-sm hover:text-indigo-400 transition-colors">Documentation</a></li>
                  <li><a href="#api" className="text-sm hover:text-indigo-400 transition-colors">API Reference</a></li>
                  <li><a href="#changelog" className="text-sm hover:text-indigo-400 transition-colors">Changelog</a></li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-200 tracking-wider uppercase">Stay Updated</h3>
                <p className="mt-4 text-sm text-slate-400"> Get notified on feature additions and architectural updates.</p>
                <div className="mt-4 flex max-w-md gap-x-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    className="w-full min-w-0 rounded-full border border-slate-800 bg-slate-900/50 py-1.5 px-4 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-none rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600"
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 border-t border-slate-900 pt-8 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-y-4">
          <p className="text-xs leading-5 text-slate-500">
            &copy; {currentYear} MP Repo Analyzer. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs leading-5 text-slate-500">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-slate-300 transition-colors">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
