import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

type ResponseLogin = {
    success: boolean,
    data?: UserCredential,
    message?: string
};

export function getConfig() {
    return {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    }
}

export async function getUserData(user: string, pass: string): Promise<ResponseLogin> {
    initializeApp(getConfig());
    const auth = getAuth();

    try {
        const res = await signInWithEmailAndPassword(auth, user, pass);
        return { success: true, data: res };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}