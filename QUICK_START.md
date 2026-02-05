# 🚀 Quick Start Guide

## 🏗️ Project Structure

```
GSPROD/
├── backend/          # FastAPI backend (Python)
└── frontend/         # Next.js frontend (TypeScript/React)
```

## 🏃 How to Run the Project

### Backend (Port 8000)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend API: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

### Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
npm start
```

## 📤 Push to GitHub

### Option 1: First Time Setup

```bash
# Set your git identity (one-time setup)
git config user.email "your.email@example.com"
git config user.name "Your Name"

# Commit your changes
git add .
git commit -m "feat: Complete Gelbe Seiten replica"

# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/gelbeseiten-replica.git
git branch -M main
git push -u origin main
```

### Option 2: If You Already Have a Repository

```bash
# Set your git identity (if not done)
git config user.email "your.email@example.com"
git config user.name "Your Name"

# Commit and push
git add .
git commit -m "feat: Complete Gelbe Seiten replica"
git push
```

## ⚠️ Requirements

- **Node.js:** 20.9.0 or higher (you have 18.20.8 - NEED TO UPGRADE!)
- **npm:** 9.0.0 or higher

### Upgrade Node.js

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from nodejs.org
# https://nodejs.org/
```

## 🎯 What's Pending

1. **Upgrade Node.js** (from 18.20.8 to 20.9.0+)
2. **Set Git Identity** (email and name)
3. **Create GitHub Repository**
4. **Push Code to GitHub**

That's it! Nothing else is pending - the code is complete and ready.

## 📊 Project Stats

- **Source Files:** 10 TypeScript/React files
- **Components:** 5 reusable components
- **Pages:** 2 routes (homepage + dynamic branches)
- **Assets:** 281 images/icons/fonts
- **Dependencies:** 4 core packages
- **Total Size:** ~600MB (mostly assets)

## 🧪 Test the Build

```bash
# This will verify everything works
npm run build
```

If build succeeds, you're ready to deploy!

## 🌐 Deploy (Optional)

### Vercel (Easiest)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Other Options

- Netlify
- Railway
- Render
- Your own server

---

**That's it! Simple and clean. Any developer can take over from here.**
