import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'about', label: 'About', emoji: '👤' },
    { id: 'skills', label: 'Skills', emoji: '⚡' },
    { id: 'projects', label: 'Projects', emoji: '💼' },
    { id: 'contact', label: 'Contact', emoji: '📧' }
  ]

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    }
  }

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="desktop-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-emoji">🐬</span>
          Portfolio
        </motion.div>
        
        <div className="nav-items">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ 
                scale: 1.1,
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 300
              }}
            >
              <span className="nav-emoji">{item.emoji}</span>
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <motion.button
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="hamburger-line"
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        />
        <motion.div
          className="hamburger-line"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.div
          className="hamburger-line"
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        />
      </motion.button>

      {/* Mobile Navigation Menu */}
      <motion.div
        className="mobile-nav"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div className="mobile-nav-content">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(item.id)
                setIsOpen(false)
              }}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                x: 10
              }}
            >
              <span className="nav-emoji">{item.emoji}</span>
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Navigation
