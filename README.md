# 🐬 Dolphin Portfolio

A modern, responsive portfolio website with deep sea theme, featuring dynamic GitHub integration, animated particle backgrounds, and professional contact system.

## 🌊 Features

- **Deep Sea Theme**: Beautiful ocean-inspired design with animated backgrounds
- **GitHub Integration**: Automatically fetch and display your latest projects
- **Contact System**: Professional contact form with email notifications
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Powered by Framer Motion
- **Particle Effects**: Interactive background animations

## 📧 Email System

The portfolio includes a complete email system that sends:
- **Admin notifications** to `dolphin.co.solution@gmail.com`
- **Thank you emails** to visitors with message confirmation
- **File attachments** support (up to 10MB)
- **Beautiful HTML templates** with deep sea theme

## 🚀 Deployment to Netlify

### Step 1: Prepare Your Repository
```bash
# Make sure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`
5. Click **"Deploy site"**

### Step 3: Test Your Deployment
```bash
# Test the email function
node test-deployed-email.js https://your-site-name.netlify.app
```

## 🧪 Testing

### Local Development
```bash
npm install
npm run dev
```

### Test Email Function (After Deployment)
```bash
node test-deployed-email.js https://your-deployed-site.netlify.app
```

### Manual Testing
1. Fill out the contact form on your live site
2. Check `dolphin.co.solution@gmail.com` for admin notification
3. Check the visitor's email for thank you message

## 📁 Project Structure

```
dolphin-portfolio/
├── netlify/
│   └── functions/
│       └── send-contact-email.js    # Email function
├── public/
│   ├── profile.jpg                  # Your profile image
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Contact.tsx             # Contact form
│   │   ├── Hero.tsx                # Hero section
│   │   ├── Projects.tsx            # GitHub projects
│   │   └── ...
│   └── App.css                     # Global styles
├── netlify.toml                     # Netlify configuration
└── package.json
```

## 🔧 Configuration

### Email Settings
- **Sender**: `dolphin.co.mailer@gmail.com`
- **Admin recipient**: `dolphin.co.solution@gmail.com`
- **App password**: Configured in the function

### File Upload Limits
- **Max file size**: 10MB
- **Allowed types**: Images and PDFs

## 🎨 Customization

### Colors
Edit `src/App.css` to change the deep sea color scheme:
```css
:root {
  --primary: #00d4ff;
  --secondary: #007BFF;
  --background: linear-gradient(135deg, #001122 0%, #003366 50%, #001122 100%);
}
```

### Email Templates
Modify the HTML templates in `netlify/functions/send-contact-email.js` to customize email appearance.

## 🐛 Troubleshooting

### Email Not Sending
1. Check Gmail app password is correct
2. Verify recipient emails are valid
3. Check Netlify function logs in dashboard

### Form Not Working
1. Ensure all required fields are filled
2. Check browser console for errors
3. Verify file size is under 10MB

### Build Failing
1. Run `npm install` to ensure dependencies
2. Check Node version is 18+
3. Verify all imports are correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with 💙 by Kulashekaram Danussuthan** 🐬
