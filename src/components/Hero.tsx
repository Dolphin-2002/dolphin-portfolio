import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero: React.FC = () => {
  const [text, setText] = useState('')
  const fullText = "Hi, I'm Kulashekaram Danussuthan"
  
  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, currentIndex + 1))
      currentIndex++
      if (currentIndex >= fullText.length) {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hero-emoji"
          variants={itemVariants}
          animate={floatingAnimation}
        >
          🐬
        </motion.div>
        
        <motion.h1
          className="hero-title"
          variants={itemVariants}
        >
          {text}
          <motion.span
            className="cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          variants={itemVariants}
        >
          Software Engineering Student | Full-Stack Developer | Problem Solver
        </motion.p>
        
        <motion.div
          className="hero-buttons"
          variants={itemVariants}
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 123, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/kulashekaram-danussuthan-b2a601335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 119, 181, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            📱 LinkedIn Profile
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}

export default Hero
