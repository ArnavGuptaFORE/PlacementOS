# PlacementOS - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Fork/Clone this repository**

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with GitHub
   - Click "New Project"
   - Select `ArnavGuptaFORE/PlacementOS`

3. **Configure Environment Variables**
   Add these in Vercel Project Settings → Environment Variables:
   ```
   GROQ_API_KEY=your_groq_api_key
   DATABASE_URL=file:./dev.db
   
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Build Settings** (Auto-detected):
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Deploy!**
   - Click "Deploy"
   - Your app will be live in ~2 minutes

---

### Option 2: Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - New Site from Git → GitHub
   - Select your repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Same as Vercel (see above)

4. **Deploy**

---

### Option 3: Railway

1. **Deploy on Railway**
   - Go to [Railway](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Select `ArnavGuptaFORE/PlacementOS`

2. **Add Environment Variables**
   - Same as Vercel

3. **Deploy automatically**

---

## 🔑 Getting API Keys

### Groq API Key
1. Go to https://console.groq.com
2. Sign up / Log in
3. Go to API Keys → Create API Key
4. Copy and save it as `GROQ_API_KEY`

### Firebase Setup
1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Authentication → Email/Password + Google
4. Go to Project Settings → General
5. Scroll to "Your apps" → Add Web App
6. Copy all config values to environment variables

**Detailed Firebase guide:** See `FIREBASE_SETUP_GUIDE.md`

---

## 📦 Database Notes

**Important:** SQLite (`dev.db`) works locally but **NOT** on serverless platforms like Vercel.

### For Production, you have 2 options:

#### Option A: Use Vercel Postgres (Recommended)
1. Add Vercel Postgres to your project
2. Update `DATABASE_URL` to the Postgres connection string
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run `npx prisma migrate dev`

#### Option B: Use PlanetScale (MySQL)
1. Create a database at https://planetscale.com
2. Get connection string
3. Update schema to use MySQL
4. Migrate

---

## 🌐 Post-Deployment

1. **Update Firebase Authorized Domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel/Netlify domain to "Authorized domains"

2. **Test All Features**
   - Resume Matcher
   - PPT Frameworks
   - Case Solver
   - Guesstimate
   - Company Intel
   - AI Mentor Chat
   - Placement Readiness

3. **Monitor Logs**
   - Check Vercel/Netlify logs for errors
   - Monitor Groq API usage

---

## 🔧 Troubleshooting

### Build Fails
- Ensure all environment variables are set
- Check Node.js version (use 18.x or higher)

### Firebase Auth Not Working
- Verify all Firebase env vars are correct
- Add deployment domain to Firebase authorized domains

### API Errors
- Check Groq API key is valid
- Verify API key has sufficient credits

### Database Issues
- For production, switch from SQLite to PostgreSQL
- Run `npx prisma generate` after schema changes

---

## 📊 Monitoring

- **Vercel Analytics**: Built-in analytics available
- **Firebase Console**: Monitor authentication
- **Groq Console**: Track API usage and costs

---

## 🎯 Performance Tips

1. Enable Vercel Edge Functions for faster response
2. Use Vercel Image Optimization for logo
3. Enable caching for static assets
4. Monitor and optimize API calls

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file
- ✅ Keep API keys in environment variables only
- ✅ Set up Firebase security rules
- ✅ Use HTTPS only (automatic on Vercel/Netlify)
- ✅ Enable rate limiting for API routes (optional)

---

## 📞 Support

For issues, create an issue on GitHub: https://github.com/ArnavGuptaFORE/PlacementOS/issues

