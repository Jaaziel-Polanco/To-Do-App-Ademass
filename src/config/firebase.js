import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// aca van las variables de entorno que se crearon en el archivo .env para proteger las credenciales de firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// inicializa firestore
const db = getFirestore(appFirebase);
export { db };

export default appFirebase;