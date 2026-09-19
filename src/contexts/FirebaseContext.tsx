import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, isQuotaError, isQuotaExceeded, setQuotaExceeded } from '../firebase';
import { UserProfile } from '../types';

interface FirebaseContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const cacheKey = `user_profile_${firebaseUser.uid}`;
        const fallbackProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          role: firebaseUser.email === 'asifmalik497@gmail.com' ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        };

        let currentProfile = fallbackProfile;
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            currentProfile = { ...fallbackProfile, ...JSON.parse(cached) };
            setProfile(currentProfile);
          }
        } catch (_) {}

        if (isQuotaExceeded()) {
          setProfile(currentProfile);
          setLoading(false);
          return;
        }

        try {
          // Fetch or create user profile
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            // Ensure specific email always has admin role even if already exists
            if (firebaseUser.email === 'asifmalik497@gmail.com' && data.role !== 'admin') {
              try {
                await setDoc(doc(db, 'users', firebaseUser.uid), { ...data, role: 'admin' }, { merge: true });
              } catch (_) {}
              const updated = { ...data, role: 'admin' as const };
              setProfile(updated);
              try { localStorage.setItem(cacheKey, JSON.stringify(updated)); } catch (_) {}
            } else {
              setProfile(data);
              try { localStorage.setItem(cacheKey, JSON.stringify(data)); } catch (_) {}
            }
          } else {
            // Create new profile
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              role: firebaseUser.email === 'asifmalik497@gmail.com' ? 'admin' : 'user',
              createdAt: new Date().toISOString()
            };
            
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                ...newProfile,
                createdAt: serverTimestamp()
              });
            } catch (_) {}
            setProfile(newProfile);
            try { localStorage.setItem(cacheKey, JSON.stringify(newProfile)); } catch (_) {}
          }
        } catch (error: any) {
          if (isQuotaError(error)) {
            setQuotaExceeded(true);
            console.warn("[Auth] Firestore daily read quota reached. Running with cached user profile.");
          } else {
            console.warn("Notice: Firestore profile sync skipped:", error?.message || error);
          }
          setProfile(currentProfile);
          try { localStorage.setItem(cacheKey, JSON.stringify(currentProfile)); } catch (_) {}
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [authError, setAuthError] = useState<string | null>(null);

  const login = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Firebase Login Error:", error);
      if (error?.code === 'auth/unauthorized-domain') {
        const msg = `Unauthorized Domain: Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`;
        setAuthError(msg);
        console.error(msg);
        alert(msg);
      } else if (error?.code === 'auth/popup-closed-by-user') {
        console.log("Login popup was closed before completion.");
      } else if (error?.code === 'auth/popup-blocked') {
        alert("Login popup was blocked by your browser. Please allow popups for this website.");
      } else {
        setAuthError(error.message || "Failed to sign in.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <FirebaseContext.Provider value={{ user, profile, loading, isAdmin, login, logout, authError }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
