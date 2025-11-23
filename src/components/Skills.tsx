import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const skills = [
    { name: "C#", level: 85, color: "#239120", icon: "💜" },
    { name: "PHP", level: 80, color: "#777BB4", icon: "�" },
    { name: "JavaScript", level: 75, color: "#F7DF1E", icon: "🟨" },
    { name: "HTML/CSS", level: 88, color: "#E34F26", icon: "🎨" },
    { name: "MySQL", level: 82, color: "#4479A1", icon: "🗄️" },
    { name: "Python", level: 70, color: "#3776AB", icon: "🐍" },
    { name: "Java", level: 75, color: "#007396", icon: "☕" },
    { name: "Git", level: 78, color: "#F05032", icon: "📚" }
  ]

  const tools = [
    { name: "VS Code", icon: "💻" },
    { name: "Visual Studio", icon: "🔷" },
    { name: "PHPMyAdmin", icon: "�️" },
    { name: "XAMPP", icon: "🌐" },
    { name: "MS Office", icon: "�" },
    { name: "Windows", icon: "🖥️" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="skills" id="skills" ref={ref}>
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
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⚡
          </motion.span>
          <h2>Skills & Technologies</h2>
          <p>Technologies I love working with</p>
        </motion.div>

        <div className="skills-content">
          <motion.div className="skills-grid" variants={itemVariants}>
            <h3>Programming Languages & Frameworks</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="skill-info">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                
                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      className="skill-bar-glow"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="tools-section" variants={itemVariants}>
            <h3>Tools & Platforms</h3>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="tool-card"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={inView ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0 
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    boxShadow: "0 10px 30px rgba(0, 123, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="tool-icon"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tool.icon}
                  </motion.span>
                  <span className="tool-name">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="skills-summary" variants={itemVariants}>
            <motion.div
              className="summary-card"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 123, 255, 0.1)"
              }}
            >
              <h3>🚀 Currently Learning</h3>
              <p>
                I believe in continuous learning and staying up-to-date with the latest 
                technologies. Currently focusing on full-stack web development and exploring 
                advanced programming techniques in C# and PHP development.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
