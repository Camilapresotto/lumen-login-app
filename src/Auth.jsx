import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhpA9YagAsLqmgfVyDz7acOhOXB-XaVwE",
  authDomain: "minha-ia-vendedora.firebaseapp.com",
  projectId: "minha-ia-vendedora",
  storageBucket: "minha-ia-vendedora.firebasestorage.app",
  messagingSenderId: "470701401205",
  appId: "1:470701401205:web:a8aab0c0f35c181b71443c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export default function Auth() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modo, setModo] = useState('login');

  const handleAuth = async () => {
    try {
      if (modo === 'login') {
        await auth.signInWithEmailAndPassword(email, senha);
        alert('Login realizado com sucesso!');
      } else {
        await auth.createUserWithEmailAndPassword(email, senha);
        alert('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div style={{ width: 300, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{modo === 'login' ? 'Entrar' : 'Cadastrar'}</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleAuth} style={{ width: '100%', padding: 10 }}>
        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
      </button>
      <p>
        {modo === 'login' ? "Não tem conta?" : "Já tem conta?"}
        <button
          onClick={() => setModo(modo === 'login' ? 'cadastro' : 'login')}
          style={{ marginLeft: 8 }}
        >
          {modo === 'login' ? 'Cadastrar' : 'Entrar'}
        </button>
      </p>
    </div>
  );
}