import { FirebaseApp, initializeApp } from 'firebase/app';
import { createContext, useContext } from 'react';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    databaseURL: import.meta.env.VITE_databaseURL,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};

const firebaseAPP = initializeApp(firebaseConfig)
// export const db = getFirestore(firebaseAPP)
// export const analytics = getAnalytics(firebaseAPP);

const FirebaseContext = createContext<FirebaseApp | null>(null);

export const FirebaseProvider = ({ children }: any) => {    
    return <FirebaseContext.Provider value={firebaseAPP}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = (): FirebaseApp => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};