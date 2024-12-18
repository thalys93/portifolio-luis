export interface GithubReturn {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    isAnonymous: boolean;
    createdAt: string;
    lastLoginAt: string;
    providerData: {
        providerId: string;
        uid: string;
        displayName?: string; 
        email?: string;
        phoneNumber: string | null;
        photoURL: string | null;
    }
}