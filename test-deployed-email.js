// Test script for deployed email function
const fetch = require('node-fetch');

async function testDeployedEmailFunction(siteUrl) {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    reason: "Work",
    subject: "Test Email from Deployed Site",
    message: "This is a test message to verify the email system works on the deployed site."
  };

  try {
    console.log('🧪 Testing deployed email function...');
    console.log('📧 Site URL:', siteUrl);

    const response = await fetch(`${siteUrl}/.netlify/functions/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('📧 Response Status:', response.status);
    console.log('📧 Response:', result);

    if (response.ok && result.success) {
      console.log('✅ Email function works perfectly!');
      console.log('📧 Check dolphin.co.solution@gmail.com for admin notification');
      console.log('📧 Check test@example.com for thank you email');
    } else {
      console.log('❌ Email function failed:', result.error);
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
    console.log('💡 Make sure the site URL is correct and the site is deployed');
  }
}

// Usage: node test-deployed-email.js https://your-site-name.netlify.app
const siteUrl = process.argv[2];
if (!siteUrl) {
  console.log('❌ Please provide your deployed site URL');
  console.log('📝 Usage: node test-deployed-email.js https://your-site-name.netlify.app');
  process.exit(1);
}

testDeployedEmailFunction(siteUrl);