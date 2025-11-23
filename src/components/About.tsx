import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

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
        damping: 20,
        stiffness: 100
      }
    }
  }

  const stats = [
    { number: "50+", label: "Projects Completed", emoji: "🚀" },
    { number: "3+", label: "Years Experience", emoji: "⏱️" },
    { number: "100%", label: "Client Satisfaction", emoji: "😊" },
    { number: "24/7", label: "Support Available", emoji: "🔧" }
  ]

  return (
    <section className="about" id="about" ref={ref}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <motion.span 
            className="section-emoji"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👤
          </motion.span>
          <h2>About Me</h2>
          <p>Get to know more about who I am and what I do</p>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-text" variants={itemVariants}>
            <motion.div
              className="about-card"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 123, 255, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>Hi there! I'm a passionate developer 🐬</h3>
              <p>
                I love creating digital experiences that are not only functional but also 
                delightful to use. With a keen eye for design and a passion for clean code, 
                I bring ideas to life through modern web technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open source projects, or enjoying a good cup of coffee while sketching 
                out my next creative project.
              </p>
              
              <motion.div 
                className="about-highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <div className="highlight-item">
                  <span className="highlight-emoji">🎨</span>
                  <span>Creative Problem Solver</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-emoji">⚡</span>
                  <span>Fast Learner</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-emoji">🤝</span>
                  <span>Team Player</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="about-stats" variants={itemVariants}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <motion.span 
                  className="stat-emoji"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.emoji}
                </motion.span>
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 500
                  }}
                >
                  {stat.number}
                </motion.h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
