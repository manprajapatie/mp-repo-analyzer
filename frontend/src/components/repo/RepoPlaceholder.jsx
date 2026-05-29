import React from 'react'
import { motion } from 'motion/react'



const RepoPlaceholder = () => {
    // Animation for clean entry
    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    }


    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }


    return (
        <>
            <div className="w-full p-5 min-h-190 flex flex-col justify-center items-center text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 backdrop-blur-sm">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-2xl px-6 py-12 flex flex-col justify-center items-center text-center rounded-2xl border border-dashed border-slate-800/80  backdrop-blur-md shadow-2xl relative overflow-hidden"
                >

                    {/* Primary Heading with Lines & Right-to-Left Character Pops */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-7xl font-extrabold text-white tracking-normal leading-none text-right uppercase"
                    >
                        {/* Line 1 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                            }}
                        >
                            It Makes
                        </motion.div>

                        {/* Line 2 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                            }}
                            className="my-1"
                        >
                            YOUR
                        </motion.div>

                        {/* Line 3: Funky Right-to-Left Character Breakout */}
                        <motion.div
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.06 } }
                            }}
                            className=" text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 my-2 flex flex-row-reverse justify-start"
                        >
                            {"Analyzation".split("").reverse().map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 30, scale: 0.3, rotate: 25 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            rotate: 0,
                                            transition: { type: "spring", bounce: 0.45, duration: 0.6 }
                                        }
                                    }}
                                    className="inline-block font-black origin-center cursor-default hover:text-pink-500 hover:scale-125 transition-colors duration-150"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Line 4 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                            }}
                        >
                            EASY
                        </motion.div>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-sm sm:text-base font-medium text-indigo-400 mt-2 tracking-wide uppercase "
                    >
                        Select Commit to See Details
                    </motion.h2>

                    {/* Divider Line */}
                    <motion.div
                        variants={itemVariants}
                        className="w-50 h-0.5 bg-linear-to-r from-indigo-500 to-cyan-500 my-6 rounded-full"
                    />

                    {/* Description Text Block */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-2 max-w-md"
                    >

                        {"MP REPO Analyzer".split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.3, rotate: 25 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    rotate: 0
                                }}
                                transition={{
                                    type: "spring",
                                    bounce: 0.45,
                                    duration: 0.6,
                                    // Create increment delay for each character starting from the right
                                    delay: index * 0.09
                                }}

                                // the animation only plays once when seen
                                viewport={{ once: true, margin: "-50px" }}

                                className="inline-block font-black origin-center cursor-default text-4xl">
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))
                        }

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                            Compare what developers contribute to parse code additions, rewrite metrics, and inspect historical workspace changes cleanly.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}


export default RepoPlaceholder
