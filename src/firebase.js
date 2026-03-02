import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCbOpD32dlvF43dzpV8KrtBipfzU4f_6as",
    authDomain: "netflix-clone-de48e.firebaseapp.com",
    projectId: "netflix-clone-de48e",
    storageBucket: "netflix-clone-de48e.firebasestorage.app",
    messagingSenderId: "301685575666",
    appId: "1:301685575666:web:cbb7b782b9b35f7145656b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
