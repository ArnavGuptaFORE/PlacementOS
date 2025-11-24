# PlacementOS Quick Start ⚡

Get PlacementOS running in 5 minutes or less!

---

## 🎯 Prerequisites

- Node.js 18+ installed
- A Groq API key ([Get free key](https://console.groq.com))

---

## 🚀 Installation (4 Commands)

### Option A: Automated Setup (Recommended)

**On Mac/Linux:**
```bash
npm install
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**On Windows:**
```bash
npm install
scripts\setup.bat
```

Then:
1. Edit `.env` and add your `GROQ_API_KEY`
2. Add your logo to `public/logo.png`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Option B: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# 3. Setup database
npx prisma generate
npx prisma migrate dev --name init

# 4. Add logo
# Copy your logo to public/logo.png

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## ✅ Verification

After setup, test these:

1. ✓ Landing page loads
2. ✓ Logo appears
3. ✓ Dashboard is accessible
4. ✓ Resume Matcher works (paste sample text)
5. ✓ AI Chat responds

---

## 🆘 Issues?

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Database error?**
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

**API errors?**
- Check your `GROQ_API_KEY` in `.env`
- Restart the dev server

---

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand the codebase

---

## 🎯 First Things to Try

1. **Test Resume Matcher**
   - Go to Dashboard → Resume Matcher
   - Paste a sample resume and job description
   - Get instant analysis

2. **Chat with AI Mentor**
   - Go to Dashboard → AI Mentor
   - Ask: "How do I prepare for a consulting case interview?"

3. **Solve a Guesstimate**
   - Go to Guesstimate
   - Try: "How many Starbucks are there in New York City?"

---

**That's it! You're ready to dominate placements with PlacementOS! 🚀**


