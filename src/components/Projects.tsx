import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "Study Management System",
      description: "A desktop application built with C# to help students organize and manage their study schedules effectively",
      tags: ["C#", "Desktop App", ".NET Framework"],
      image: "�",
      color: "#239120",
      status: "Completed",
      link: "#"
    },
    {
      id: 2,
      title: "HTML Game Development",
      description: "Interactive web-based games using HTML, CSS, and JavaScript with engaging user interfaces",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "🎮",
      color: "#E34F26",
      status: "Completed",
      link: "#"
    },
    {
      id: 3,
      title: "School Management System",
      description: "Desktop application for managing school operations, student records, and administrative tasks",
      tags: ["C#", "Database", "Desktop App"],
      image: "�",
      color: "#007396",
      status: "Completed",
      link: "#"
    },
    {
      id: 4,
      title: "Kick Blast Judo Payment Calculator",
      description: "Academic project for calculating judo training payments with user-friendly interface",
      tags: ["C#", "Desktop App", "Academic"],
      image: "🥋",
      color: "#FF6B6B",
      status: "Completed",
      link: "#"
    },
    {
      id: 5,
      title: "Velvet Vouge Shopping Web App",
      description: "Full-stack e-commerce web application with front-end, back-end, and database integration",
      tags: ["Front-End", "PHP", "MySQL"],
      image: "🛍️",
      color: "#777BB4",
      status: "Completed",
      link: "#"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "This animated portfolio website showcasing my skills and projects with modern design",
      tags: ["React", "TypeScript", "Framer Motion"],
      image: "🐬",
      color: "#61DAFB",
      status: "Live",
      link: "#"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const projectVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      rotateX: 25
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  }

  return (
    <section className="projects" id="projects" ref={ref}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="section-emoji"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💼
          </motion.span>
          <h2>My Projects</h2>
          <p>Here are some of my favorite projects I've worked on</p>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={projectVariants}
              whileHover={{
                y: -10,
                rotateY: hoveredProject === index ? 5 : 0,
                rotateX: hoveredProject === index ? -5 : 0,
                scale: 1.02,
                boxShadow: `0 25px 50px ${project.color}30`
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              <motion.div
                className="project-card-inner"
                style={{ backgroundColor: project.color + '10' }}
              >
                <div className="project-header">
                  <motion.div 
                    className="project-emoji"
                    animate={{
                      rotate: hoveredProject === index ? [0, 360] : 0,
                      scale: hoveredProject === index ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {project.image}
                  </motion.div>
                  
                  <motion.div 
                    className="project-status"
                    style={{ backgroundColor: project.color }}
                    animate={{
                      scale: hoveredProject === index ? 1.1 : 1
                    }}
                  >
                    {project.status}
                  </motion.div>
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="project-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          delay: 0.3 + index * 0.1 + tagIndex * 0.05 
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: project.color + '30'
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="project-footer"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === index ? 1 : 0.7 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="project-button"
                    style={{ 
                      backgroundColor: project.color,
                      borderColor: project.color
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 5px 15px ${project.color}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Project</span>
                    <motion.span
                      className="button-arrow"
                      animate={{
                        x: hoveredProject === index ? 5 : 0
                      }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>

                {/* Animated background gradient */}
                <motion.div
                  className="project-bg-gradient"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`
                  }}
                  animate={{
                    opacity: hoveredProject === index ? 1 : 0,
                    scale: hoveredProject === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="view-more-button"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 123, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🚀
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
