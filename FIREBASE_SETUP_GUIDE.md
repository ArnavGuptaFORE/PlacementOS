# Firebase Authentication Setup Guide

## Overview
This guide explains how to add Firebase authentication to PlacementOS to enable user accounts and cloud data sync.

---

## Current State
- ✅ All features working with localStorage
- ✅ Data persists across page navigations
- ✅ SQLite database for session storage
- ⚠️ No user authentication (single-user mode)
- ⚠️ Data stored locally only

---

## Future Firebase Implementation Plan

### Step 1: Install Firebase
```bash
npm install firebase
```

### Step 2: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication (Email/Password, Google Sign-In)
4. Enable Firestore Database
5. Copy your Firebase config

### Step 3: Add Firebase Config
Create `lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Step 4: Create Auth Context
Create `contexts/AuthContext.tsx`:
```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Step 5: Update App Layout
Wrap app in `app/layout.tsx`:
```typescript
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Step 6: Create Login/Signup Pages
- `app/login/page.tsx` - Login form
- `app/signup/page.tsx` - Signup form
- Use `useAuth()` hook to handle authentication

### Step 7: Protect Routes
Create `components/ProtectedRoute.tsx`:
```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
```

### Step 8: Migrate from localStorage to Firestore
Update each feature page to save to Firestore instead:

**Before (localStorage):**
```typescript
localStorage.setItem('resume-matcher-result', JSON.stringify(result));
```

**After (Firestore):**
```typescript
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

const { user } = useAuth();
await setDoc(doc(db, `users/${user.uid}/resumeAnalyses/${id}`), result);
```

### Step 9: Update Database Schema
Firestore Collections:
```
users/
  {userId}/
    profile/
      - name
      - email
      - createdAt
    resumeAnalyses/
      {analysisId}/
        - resumeText
        - jdText
        - result
        - createdAt
    caseSessions/
      {sessionId}/
        - inputText
        - sessionType
        - result
        - createdAt
    guesstimatesSessions/
    companyIntelSessions/
    chatMessages/
```

### Step 10: Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Migration Strategy

### Phase 1: Add Authentication (Week 1)
1. Install Firebase
2. Create login/signup pages
3. Add AuthContext
4. Protect dashboard routes

### Phase 2: Migrate Data (Week 2)
1. Keep localStorage as backup
2. Add Firestore saves alongside localStorage
3. Test data sync
4. Remove localStorage once stable

### Phase 3: Add Features (Week 3)
1. User profile page
2. Data export functionality
3. Multi-device sync
4. Sharing capabilities

---

## Benefits After Firebase Integration

✅ **User Accounts** - Secure authentication  
✅ **Cloud Storage** - Access from any device  
✅ **Data Backup** - Never lose progress  
✅ **Multi-device Sync** - Start on laptop, continue on phone  
✅ **Sharing** - Share results with others  
✅ **Analytics** - Track user progress over time  
✅ **Scalability** - Handle many users  

---

## Cost Considerations

**Firebase Free Tier:**
- 50K reads/day
- 20K writes/day
- 1GB storage
- Good for ~100 active users

**Paid (Blaze Plan):**
- Pay as you go
- ~$0.06 per 100K reads
- Cost effective for most use cases

---

## Current Workaround (Until Firebase)

The app currently uses:
1. **localStorage** for UI state persistence (navigating between pages)
2. **SQLite + Prisma** for session storage (database records)
3. **Single-user mode** (no authentication)

This works perfectly for:
- Personal use
- Development
- Testing
- Single-user deployments

---

## When to Implement Firebase?

Implement Firebase when you need:
- Multiple users
- Cloud data sync
- Mobile app integration
- Data sharing between users
- Production deployment for many users

---

## Questions?

Firebase setup is straightforward but takes time. The current localStorage + SQLite setup works great for single-user scenarios. Only migrate to Firebase when you need multi-user capabilities.

