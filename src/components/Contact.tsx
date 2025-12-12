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
    reason: 'Work',
    subject: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [attachment, setAttachment] = useState<File | null>(null)

  const contactMethods = [
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setAttachment(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Show loading state
    const submitButton = document.querySelector('.submit-button') as HTMLButtonElement
    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = 'Sending... 🐬'
    }

    try {
      // Prepare form data for submission
      const submitData: any = {
        name: formData.name,
        email: formData.email,
        reason: formData.reason,
        subject: formData.subject,
        message: formData.message
      }

      // Handle file attachment
      if (attachment) {
        const reader = new FileReader()
        const filePromise = new Promise((resolve) => {
          reader.onload = () => {
            submitData.attachment = {
              name: attachment.name,
              type: attachment.type,
              content: reader.result
            }
            resolve(submitData)
          }
          reader.readAsDataURL(attachment)
        })
        await filePromise
      }

      // Send to Netlify function
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert('Thank you! Your message has been sent successfully. Check your email for confirmation! 🐬')
        // Reset form
        setFormData({
          name: '',
          email: '',
          reason: 'Work',
          subject: '',
          message: ''
        })
        setAttachment(null)
        // Reset file input
        const fileInput = document.getElementById('attachment') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        // Handle different error types
        let errorMessage = 'Failed to send message. '

        if (result.error) {
          if (result.error.includes('Missing')) {
            errorMessage += 'Please fill in all required fields.';
          } else if (result.error.includes('email')) {
            errorMessage += 'Please enter a valid email address.';
          } else if (result.error.includes('Attachment too large')) {
            errorMessage += 'File size must be under 10MB.';
          } else if (result.error.includes('Invalid attachment')) {
            errorMessage += 'Please check your file and try again.';
          } else {
            errorMessage += result.error;
          }
        } else {
          errorMessage += 'Please try again later or contact us directly.';
        }

        alert(errorMessage)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      // Reset button
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = 'Send Message ✈️'
      }
    }
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
              onSubmit={handleSubmit}
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
                <motion.select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('reason')}
                  onBlur={() => setFocusedField(null)}
                  className={focusedField === 'reason' ? 'focused' : ''}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
                  }}
                >
                  <option value="Work">🤝 Work Inquiry</option>
                  <option value="Collaboration">🎨 Collaboration</option>
                  <option value="Other">📋 Other</option>
                </motion.select>
                <motion.label
                  className="floating-label"
                  animate={{
                    y: focusedField === 'reason' || formData.reason ? -25 : 0,
                    scale: focusedField === 'reason' || formData.reason ? 0.8 : 1,
                    color: focusedField === 'reason' ? '#007BFF' : '#666'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  📌 Reason for Contact
                </motion.label>
              </motion.div>

              <motion.div className="form-group">
                <motion.input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={focusedField === 'subject' ? 'focused' : ''}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)"
                  }}
                />
                <motion.label
                  className="floating-label"
                  animate={{
                    y: focusedField === 'subject' || formData.subject ? -25 : 0,
                    scale: focusedField === 'subject' || formData.subject ? 0.8 : 1,
                    color: focusedField === 'subject' ? '#007BFF' : '#666'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  📝 Subject
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

              <motion.div className="form-group">
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    name="attachment"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    id="attachment"
                  />
                  <label htmlFor="attachment" className="file-input-label">
                    📎 Choose file (optional)
                  </label>
                  <span className="file-name">
                    {attachment ? attachment.name : 'No file selected'}
                  </span>
                </div>
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
