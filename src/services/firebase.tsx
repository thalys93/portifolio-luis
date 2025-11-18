import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, increment, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};


const FirebaseAPP = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseAPP);
export const FirebaseDB = getFirestore(FirebaseAPP);
export const FirebaseStorage = getStorage(FirebaseAPP);

let FirebaseAnalytics: Analytics | null = null;

export async function initAnalytics() {
    if (typeof window === "undefined") return null;
    if (!firebaseConfig.measurementId) return null;
    const supported = await isSupported();
    if (!supported) return null;
    FirebaseAnalytics = getAnalytics(FirebaseAPP);
    return FirebaseAnalytics;
}

export function trackEvent(name: string, params?: Record<string, any>) {
    if (FirebaseAnalytics) {
        try { logEvent(FirebaseAnalytics, name, params); } catch { }
    }
    try {
        const d = doc(FirebaseDB, 'analytics_events', name)
        setDoc(d, { count: increment(1), lastAt: serverTimestamp() }, { merge: true })
    } catch {}
}

export function trackPageView(path: string) {
    trackEvent("page_view", { page_path: path });
}

export const AuthProviders = {
    Google: new GoogleAuthProvider(),
    Github: new GithubAuthProvider(),
}