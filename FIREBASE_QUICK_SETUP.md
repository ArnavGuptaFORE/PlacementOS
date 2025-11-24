# 🔥 Firebase Quick Setup Guide

## Step 1: Install Firebase Package

```bash
npm install firebase
```

## Step 2: Get Firebase Config from Console

### Go to Firebase Console
1. Visit: **https://console.firebase.google.com**
2. Click **"Add project"** (or select existing project)
3. Enter project name: `PlacementOS` (or any name)
4. Click **Continue**
5. Disable Google Analytics (optional) or enable it
6. Click **Create project**
7. Wait for project creation (~30 seconds)
8. Click **Continue**

### Add Web App
1. On the project dashboard, click the **Web icon** `</>`
2. Enter app nickname: `PlacementOS Web`
3. **Don't** check "Also set up Firebase Hosting"
4. Click **Register app**

### Copy Configuration
You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "placementos-abc123.firebaseapp.com",
  projectId: "placementos-abc123",
  storageBucket: "placementos-abc123.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

**Copy these values!** You'll need them next.

## Step 3: Setup Authentication

1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Enable **"Email/Password"**
   - Click on it
   - Toggle **Enable**
   - Click **Save**
5. **(Optional)** Enable **"Google"** sign-in
   - Click on Google
   - Toggle **Enable**
   - Enter project support email
   - Click **Save**

## Step 4: Setup Firestore (Optional - for cloud sync)

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose location closest to you
5. Click **Enable**
6. Wait for database creation

## Step 5: Add Config to Your App

1. Copy `ENV_TEMPLATE.txt` to `.env`:
   ```bash
   cp ENV_TEMPLATE.txt .env
   ```

2. Open `.env` and fill in your Firebase config:

```env
# Your existing Groq API key
GROQ_API_KEY=your_groq_api_key_here

DATABASE_URL="file:./dev.db"

# Firebase config from Step 2
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=placementos-abc123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=placementos-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=placementos-abc123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

## Step 6: Restart Your App

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 7: Test Authentication

1. Go to http://localhost:3000
2. Click **"Sign Up"** in the navbar
3. Create an account with email/password
4. You should be redirected to dashboard
5. Check Firebase Console → Authentication → Users to see your account

## ✅ You're Done!

Now you have:
- ✅ Firebase Authentication working
- ✅ Login/Signup pages functional
- ✅ User session management
- ✅ Google Sign-in (if enabled)

---

## 🎯 Where to Find Everything

### Firebase Config Location
**Firebase Console:** https://console.firebase.google.com
- Project Overview → Project settings (gear icon) → Scroll down to "Your apps"
- Click on your web app to see the config again

### Quick Links
- **Authentication Users:** Firebase Console → Authentication → Users
- **Firestore Data:** Firebase Console → Firestore Database
- **API Usage:** Firebase Console → Usage

---

## 🔧 Troubleshooting

### Error: "Firebase: Error (auth/...)"
- Check that Email/Password is enabled in Firebase Console
- Verify your `.env` variables are correct
- Restart the dev server

### Can't see login button
- Make sure `npm install firebase` completed successfully
- Check browser console for errors
- Clear browser cache

### Firebase not initialized
- Double-check all env variables start with `NEXT_PUBLIC_`
- Make sure `.env` file exists in project root
- Restart dev server after adding env variables

---

## 🚀 Next Steps

1. **Test all features** with your new account
2. **Invite team members** to create accounts
3. **Setup Firestore rules** for production (in Firebase Console)
4. **Enable Google Analytics** (optional) for insights

---

## 💡 Pro Tips

- **Test Mode** in Firestore allows anyone to read/write for 30 days
- Set proper **Firestore Security Rules** before production
- Use Firebase **Emulators** for local testing (advanced)
- Enable **Email Verification** for better security

---

**Need help?** Check the full `FIREBASE_SETUP_GUIDE.md` for detailed instructions.

