// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Importa signInWithEmailAndPassword
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf1hVijFG0D5J6NThPNPfybVt9FUvxnzY",
  authDomain: "sistema-condominio-f5edd.firebaseapp.com",
  projectId: "sistema-condominio-f5edd",
  storageBucket: "sistema-condominio-f5edd.firebasestorage.app",
  messagingSenderId: "361828590651",
  appId: "1:361828590651:web:8f952f926890b5fceba81e",
  measurementId: "G-8HY68FV62E"
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