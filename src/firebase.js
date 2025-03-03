// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Importa signInWithEmailAndPassword
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para fazer login
async function fazerLogin(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Usuário logado:", user);
    alert("Login realizado com sucesso!");
    return user; // Retorna o usuário logado, se necessário
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    alert("Erro ao fazer login: " + error.message);
    throw error; // Propaga o erro para tratamento externo, se necessário
  }
}

// Exporta os módulos necessários
export { auth, db, fazerLogin };