import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const AnimatedFuseText = () => {
    const [isHit, setIsHit] = useState(false)
    const [isSwingComplete, setIsSwingComplete] = useState(false)
    const [isFlickering, setIsFlickering] = useState(false)

    const supportStyle = {
        width: '20px',
        height: '10px',
        background: '#374151',
        position: 'absolute' as const,
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '3px 3px 0 0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    }

    const threadStyle = {
        width: '2px',
        height: '20px',
        background: '#4B5563',
        position: 'absolute' as const,
        top: '0',
        left: '50%',
        transformOrigin: 'top',
    }

    const bulbContainerStyle = {
        position: 'absolute' as const,
        top: '40px',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(180deg)',
        transformOrigin: 'center',
    }

    const pendulumAnimation = {
        rotate: [0, -45, 45, -30, 30, -15, 15, -5, 5, 0],
        transition: {
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.1, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
        }
    }

    useEffect(() => {
        if (isHit && !isSwingComplete) {
            setIsFlickering(true)
            setTimeout(() => setIsFlickering(false), 4000)
        }
    }, [isHit])

    const flickerAnimation = {
        opacity: isFlickering ? [1, 0.4, 1, 0.3, 1, 0.5, 1] : 1,
        color: isFlickering ?
            ["#4B5563", "#FFD700", "#4B5563", "#FFD700", "#4B5563", "#FFD700"] :
            (isSwingComplete ? "#FFD700" : "#4B5563"),
        filter: isFlickering ?
            ["brightness(1)", "brightness(1.5)", "brightness(1)", "brightness(1.5)"] :
            (isSwingComplete ? "brightness(1.5)" : "brightness(1)")
    }

    return (
        <div className="min-h-[300px] bg-gray-900 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {!isHit && (
    <motion.div
        initial={{ x: 200, rotate: 0, scale: 1 }}
        animate={{ 
            x: -200, 
            rotate: 720,
            scale: [1, 1.1, 1]
        }}
        transition={{ 
            duration: 0.7, 
            ease: "easeIn"
        }}
        onAnimationComplete={() => setIsHit(true)}
        className="absolute top-1/3"
    >
        <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg blur-[0.5px] transform-gpu" />
    </motion.div>
)}

            <div className="relative flex flex-col items-center mb-12">
                <motion.div
                    className="relative"
                    style={{ transformOrigin: 'top center' }}
                    animate={isHit && !isSwingComplete ? pendulumAnimation : {}}
                    onAnimationComplete={() => setIsSwingComplete(true)}
                >
                    <div style={supportStyle} />
                    <div style={threadStyle} />
                    <motion.div
                        style={bulbContainerStyle}
                        animate={flickerAnimation}
                        transition={{
                            duration: isFlickering ? 0.5 : 0.3,
                            repeat: isFlickering ? 8 : 0,
                        }}
                    >
                        <Lightbulb size={40} className="filter drop-shadow-2xl" />
                        <AnimatePresence>
                            {(isFlickering || isSwingComplete) && (
                                <motion.div
                                    className="absolute inset-0 bg-yellow-300 blur-3xl rounded-full scale-150 -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: isFlickering ? [0.3, 0.7, 0.4, 0.8, 0.5, 1] : 0.7
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: isFlickering ? 0.5 : 0.3,
                                        repeat: isFlickering ? 8 : 0
                                    }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            <motion.h1
                initial={{ color: "#4B5563" }}
                animate={{
                    color: isSwingComplete ? "#FFFFFF" : "#4B5563",
                    textShadow: isSwingComplete ?
                        "0 0 10px rgba(255,173,0,0.5), 0 0 20px rgba(255,173,0,0.3)" :
                        "none"
                }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mt-2"
            >
                Mishra Hub
            </motion.h1>
        </div>
    )
}

export default AnimatedFuseText