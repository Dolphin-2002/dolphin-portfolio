const nodemailer = require('nodemailer');

// Create transporter with Gmail
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'dolphin.co.mailer@gmail.com',
      pass: 'uwwa fgla wtld cefw' // App password
    }
  });
};

// Deep sea themed email template for admin notification
const createAdminEmailTemplate = (formData, attachment) => {
  const hasAttachment = attachment ? 'Yes' : 'No';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Contact</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #001122 0%, #003366 50%, #001122 100%);
          margin: 0;
          padding: 20px;
          color: #e6eef8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 123, 255, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #00d4ff;
          font-size: 28px;
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
        .wave {
          display: block;
          font-size: 40px;
          margin: 10px 0;
          animation: wave 2s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .content {
          background: rgba(0, 123, 255, 0.05);
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
          border-left: 4px solid #00d4ff;
        }
        .field {
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }
        .field-label {
          font-weight: bold;
          color: #00d4ff;
          display: block;
          margin-bottom: 5px;
        }
        .field-value {
          color: #e6eef8;
          line-height: 1.5;
        }
        .attachment-info {
          background: rgba(255, 168, 255, 0.1);
          border: 1px solid rgba(255, 168, 255, 0.3);
          border-radius: 8px;
          padding: 15px;
          margin-top: 15px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #b3b3b3;
          font-size: 14px;
        }
        .emoji {
          font-size: 20px;
          margin: 0 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="wave">🌊</span>
          <h1>🐬 New Portfolio Contact</h1>
          <p>A visitor has reached out to you!</p>
        </div>

        <div class="content">
          <div class="field">
            <span class="field-label">👤 Name:</span>
            <span class="field-value">${formData.name}</span>
          </div>

          <div class="field">
            <span class="field-label">📧 Email:</span>
            <span class="field-value">${formData.email}</span>
          </div>

          <div class="field">
            <span class="field-label">📌 Reason:</span>
            <span class="field-value">${formData.reason}</span>
          </div>

          <div class="field">
            <span class="field-label">📝 Subject:</span>
            <span class="field-value">${formData.subject}</span>
          </div>

          <div class="field">
            <span class="field-label">💬 Message:</span>
            <span class="field-value">${formData.message.replace(/\n/g, '<br>')}</span>
          </div>

          ${attachment ? `
          <div class="attachment-info">
            <span class="field-label">📎 Attachment:</span>
            <span class="field-value">${attachment.originalname || attachment.name} (${attachment.size ? Math.round(attachment.size / 1024) + ' KB' : 'Size unknown'})</span>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>🐠 Dolphin Portfolio Contact System</p>
          <p>Received on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Thank you email template for the user
const createUserEmailTemplate = (formData, attachment) => {
  const hasAttachment = attachment ? 'Yes' : 'No';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #001122 0%, #003366 50%, #001122 100%);
          margin: 0;
          padding: 20px;
          color: #e6eef8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 123, 255, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #00d4ff;
          font-size: 28px;
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
        .dolphin {
          font-size: 50px;
          display: block;
          margin: 15px 0;
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .thank-you-message {
          background: rgba(0, 212, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
          border-left: 4px solid #00d4ff;
          text-align: center;
        }
        .thank-you-message h2 {
          color: #00d4ff;
          margin-top: 0;
        }
        .message-copy {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .message-copy h3 {
          color: #00d4ff;
          margin-top: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 10px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          color: #00d4ff;
          display: block;
          margin-bottom: 5px;
        }
        .field-value {
          color: #e6eef8;
          line-height: 1.5;
          background: rgba(255, 255, 255, 0.02);
          padding: 8px;
          border-radius: 5px;
        }
        .attachment-note {
          background: rgba(255, 168, 255, 0.1);
          border: 1px solid rgba(255, 168, 255, 0.3);
          border-radius: 8px;
          padding: 15px;
          margin-top: 15px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #b3b3b3;
          font-size: 14px;
        }
        .contact-info {
          background: rgba(0, 123, 255, 0.05);
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="dolphin">🐬</span>
          <h1>Thank You for Contacting Us!</h1>
        </div>

        <div class="thank-you-message">
          <h2>🌊 Message Received Successfully!</h2>
          <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 hours.</p>
        </div>

        <div class="message-copy">
          <h3>📋 Your Message Summary</h3>

          <div class="field">
            <span class="field-label">👤 Your Name:</span>
            <span class="field-value">${formData.name}</span>
          </div>

          <div class="field">
            <span class="field-label">📧 Your Email:</span>
            <span class="field-value">${formData.email}</span>
          </div>

          <div class="field">
            <span class="field-label">📌 Reason for Contact:</span>
            <span class="field-value">${formData.reason}</span>
          </div>

          <div class="field">
            <span class="field-label">📝 Subject:</span>
            <span class="field-value">${formData.subject}</span>
          </div>

          <div class="field">
            <span class="field-label">💬 Your Message:</span>
            <span class="field-value">${formData.message.replace(/\n/g, '<br>')}</span>
          </div>

          ${attachment ? `
          <div class="attachment-note">
            <span class="field-label">📎 Attachment Included:</span>
            <span class="field-value">${attachment.originalname || attachment.name}</span>
          </div>
          ` : ''}
        </div>

        <div class="contact-info">
          <h3>🐠 Stay Connected</h3>
          <p>While you wait for our response, feel free to check out our portfolio and connect with us on:</p>
          <p>📱 LinkedIn | 🐱 GitHub</p>
        </div>

        <div class="footer">
          <p>🐠 Dolphin Portfolio Team</p>
          <p>Sent on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed. Use POST.',
        method: event.httpMethod
      })
    };
  }

  // Check if request body exists
  if (!event.body) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  try {
    // Parse the form data
    let formData;
    try {
      formData = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid JSON in request body',
          details: parseError.message
        })
      };
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'reason', 'subject', 'message'];
    const missingFields = [];

    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: `Missing or empty required fields: ${missingFields.join(', ')}`,
          missingFields,
          receivedFields: Object.keys(formData)
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid email format',
          providedEmail: formData.email
        })
      };
    }

    // Validate reason field
    const validReasons = ['Work', 'Collaboration', 'Other'];
    if (!validReasons.includes(formData.reason)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid reason. Must be one of: Work, Collaboration, Other',
          providedReason: formData.reason,
          validReasons
        })
      };
    }

    console.log('📧 Creating email transporter...');
    const transporter = createTransporter();

    // Test the connection
    try {
      await transporter.verify();
      console.log('✅ Email transporter verified');
    } catch (verifyError) {
      console.error('❌ Email transporter verification failed:', verifyError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Email service configuration error',
          details: 'Unable to connect to email service'
        })
      };
    }

    // Prepare attachments array
    let attachments = [];
    if (formData.attachment && formData.attachment.content) {
      try {
        console.log('📎 Processing attachment...');
        const attachmentData = formData.attachment;

        // Validate file size (max 10MB)
        const fileSize = Buffer.from(attachmentData.content.split(',')[1] || '', 'base64').length;
        if (fileSize > 10 * 1024 * 1024) { // 10MB limit
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Attachment too large. Maximum size is 10MB.',
              fileSize: `${Math.round(fileSize / 1024 / 1024)}MB`
            })
          };
        }

        attachments.push({
          filename: attachmentData.name,
          content: attachmentData.content.split(',')[1], // Remove data:image/jpeg;base64, prefix
          encoding: 'base64',
          contentType: attachmentData.type
        });
        console.log('✅ Attachment processed successfully');
      } catch (attachmentError) {
        console.error('❌ Attachment processing error:', attachmentError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid attachment format',
            details: attachmentError.message
          })
        };
      }
    }

    console.log('📧 Preparing emails...');

    // Send email to admin (dolphin.co.solution@gmail.com)
    const adminMailOptions = {
      from: 'dolphin.co.mailer@gmail.com',
      to: 'dolphin.co.solution@gmail.com',
      subject: `🐬 New Portfolio Contact: ${formData.subject}`,
      html: createAdminEmailTemplate(formData, formData.attachment),
      attachments: attachments
    };

    // Send thank you email to user
    const userMailOptions = {
      from: 'dolphin.co.mailer@gmail.com',
      to: formData.email,
      subject: '🐬 Thank You for Contacting Us - Dolphin Portfolio',
      html: createUserEmailTemplate(formData, formData.attachment),
      attachments: attachments.length > 0 ? [{
        filename: `Your_${attachments[0].filename}`,
        content: attachments[0].content,
        encoding: 'base64',
        contentType: attachments[0].contentType
      }] : []
    };

    console.log('📧 Sending emails...');

    // Send both emails
    const [adminResult, userResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    // Check results
    const failures = [];
    if (adminResult.status === 'rejected') {
      console.error('❌ Admin email failed:', adminResult.reason);
      failures.push('admin notification');
    } else {
      console.log('✅ Admin email sent successfully');
    }

    if (userResult.status === 'rejected') {
      console.error('❌ User email failed:', userResult.reason);
      failures.push('user confirmation');
    } else {
      console.log('✅ User email sent successfully');
    }

    if (failures.length > 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Failed to send: ${failures.join(', ')}`,
          partialSuccess: failures.length === 1
        })
      };
    }

    console.log('🎉 All emails sent successfully!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Emails sent successfully!',
        recipient: formData.email,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('🚨 Unexpected error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Contact administrator'
      })
    };
  }
};
