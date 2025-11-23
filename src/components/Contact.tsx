import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "Danussuthan05@gmail.com",
      color: "#FF6B6B",
      link: "mailto:Danussuthan05@gmail.com"
    },
    {
      icon: "�",
      title: "Phone",
      value: "+94760807728",
      color: "#4ECDC4",
      link: "tel:+94760807728"
    },
    {
      icon: "📱",
      title: "LinkedIn",
      value: "Connect with me",
      color: "#0077B5",
      link: "https://www.linkedin.com/in/kulashekaram-danussuthan-b2a601335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
      icon: "🐱",
      title: "GitHub",
      value: "View my repos",
      color: "#333",
      link: "https://github.com/Dolphin-2002"
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    <section className="contact" id="contact" ref={ref}>
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
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            📧
          </motion.span>
          <h2>Let's Connect</h2>
          <p>I'd love to hear from you! Let's build something amazing together.</p>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-methods" variants={itemVariants}>
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                className="contact-method"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: `0 15px 30px ${method.color}30`
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ borderColor: method.color + '30' }}
              >
                <motion.div
                  className="contact-icon"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {method.icon}
                </motion.div>
                <h4 style={{ color: method.color }}>{method.title}</h4>
                <p>{method.value}</p>
                
                <motion.div
                  className="contact-method-bg"
                  style={{ backgroundColor: method.color }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="contact-form-container" variants={itemVariants}>
            <motion.form 
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(0, 123, 255, 0.1)" 
              }}
            >
              <h3>Send me a message</h3>
              
              <motion.div className="form-group">
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={focusedField === 'name' ? 'focused' : ''}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
                  }}
                />
                <motion.label
                  className="floating-label"
                  animate={{
                    y: focusedField === 'name' || formData.name ? -25 : 0,
                    scale: focusedField === 'name' || formData.name ? 0.8 : 1,
                    color: focusedField === 'name' ? '#007BFF' : '#666'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  👤 Name
                </motion.label>
              </motion.div>

              <motion.div className="form-group">
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={focusedField === 'email' ? 'focused' : ''}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
                  }}
                />
                <motion.label
                  className="floating-label"
                  animate={{
                    y: focusedField === 'email' || formData.email ? -25 : 0,
                    scale: focusedField === 'email' || formData.email ? 0.8 : 1,
                    color: focusedField === 'email' ? '#007BFF' : '#666'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  📧 Email
                </motion.label>
              </motion.div>

              <motion.div className="form-group">
                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={focusedField === 'message' ? 'focused' : ''}
                  rows={5}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
                  }}
                />
                <motion.label
                  className="floating-label"
                  animate={{
                    y: focusedField === 'message' || formData.message ? -25 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.8 : 1,
                    color: focusedField === 'message' ? '#007BFF' : '#666'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  💬 Message
                </motion.label>
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 123, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Send Message 
                </motion.span>
                <motion.span
                  className="send-icon"
                  animate={{
                    x: [0, 5, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✈️
                </motion.span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        <motion.footer 
          className="portfolio-footer"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Made with 💙 by <strong>Kulashekaram Danussuthan</strong> • © 2025
          </motion.p>
        </motion.footer>
      </motion.div>
    </section>
  )
}

export default Contact
