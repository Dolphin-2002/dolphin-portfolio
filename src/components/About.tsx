import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About: React.FC = () => {
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
    { number: "5+", label: "Projects Completed", emoji: "🚀" },
    { number: "2+", label: "Years of Study", emoji: "⏱️" },
    { number: "100%", label: "Dedication", emoji: "😊" },
    { number: "24/7", label: "Learning Mode", emoji: "🔧" }
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
              <h3>Hi there! I'm a passionate software engineering student 🐬</h3>
              <p>
                I'm a software engineering student who's excited to learn and grow in both front-end 
                and back-end development. I've started building small full-stack projects using 
                languages like C# and PHP. I enjoy figuring out how things work and solving problems 
                through debugging and troubleshooting.
              </p>
              <p>
                I'm good at staying organized and managing my time, and I'm comfortable working on 
                my own to complete projects from start to finish. Currently pursuing my HND in 
                Software Engineering at Trincomalee, Eastern Province, and continuously learning 
                new technologies to enhance my development skills.
              </p>
              
              <motion.div 
                className="about-highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <div className="highlight-item">
                  <span className="highlight-emoji">🔧</span>
                  <span>Problem Solver</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-emoji">⚡</span>
                  <span>Fast Learner</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-emoji">⏰</span>
                  <span>Time Management</span>
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
