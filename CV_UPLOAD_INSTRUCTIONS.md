# CV Download Setup Instructions 📄

## 🚨 Current Status
The CV download button will show an alert until you add your CV file.

## ✅ How to Fix CV Download

### Step 1: Prepare Your CV
1. **Convert your CV to PDF format**
2. **Rename the file** to exactly: `Kulashekaram_Danussuthan_CV.pdf`
3. **Keep the file size under 5MB** for fast loading

### Step 2: Add CV to Your Project
1. **Navigate to your project folder**: `c:\Users\HP\dolphin-portfolio\`
2. **Go to the public/assets/ folder** (should already exist)
3. **Copy your CV PDF file** into the `public/assets/` folder
4. **Ensure the filename is exactly**: `Kulashekaram_Danussuthan_CV.pdf`

### Step 3: Test the Download
1. **Refresh your browser** (Ctrl + F5)
2. **Click the "📄 Download CV" button**
3. **Your CV should download successfully**

## 📁 File Structure
```
c:\Users\HP\dolphin-portfolio\
├── public/
│   ├── assets/
│   │   └── Kulashekaram_Danussuthan_CV.pdf  ← Put your CV here
│   └── vite.svg
├── src/
└── package.json
```

## 🔧 Alternative Solutions

### Option 1: Google Drive Link
1. Upload your CV to Google Drive
2. Make it publicly viewable
3. Get the direct download link
4. Replace the onClick function in About.tsx with:
```javascript
window.open('YOUR_GOOGLE_DRIVE_LINK', '_blank');
```

### Option 2: GitHub Repository
1. Add your CV to your GitHub repository
2. Use the raw file URL
3. Update the href accordingly

## ⚠️ Common Issues

### "File Corrupted" Error:
- Make sure the file is a valid PDF
- Ensure the filename has no special characters
- Check that the file isn't password protected

### "404 Not Found" Error:
- Double-check the file is in `public/assets/` folder
- Verify the filename matches exactly: `Kulashekaram_Danussuthan_CV.pdf`
- Restart the development server: `npm run dev`

## 📝 Notes
- The public folder is served directly by Vite
- Files in public/assets/ are accessible at `/assets/filename`
- No need to import or reference the file in code
- Changes in public folder require a browser refresh
