import React, { useCallback, useMemo, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAhpA9YagAsLqmgfVyDz7acOhOXB-XaVwE',
  authDomain: 'minha-ia-vendedora.firebaseapp.com',
  projectId: 'minha-ia-vendedora',
  storageBucket: 'minha-ia-vendedora.firebasestorage.app',
  messagingSenderId: '470701401205',
  appId: '1:470701401205:web:a8aab0c0f35c181b71443c',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const modes = {
  login: {
    title: 'Acessar conta',
    subtitle: 'Acesse sua área de automação total.',
    submitLabel: 'Entrar',
  },
  cadastro: {
    title: 'Criar conta IA VENDEDORA™',
    subtitle: 'Ative sua IA Vendedora e acelere suas vendas em minutos.',
    submitLabel: 'Criar conta',
  },
};

export default function Auth() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modo, setModo] = useState('login');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const meta = useMemo(() => modes[modo], [modo]);

  const handleAuth = useCallback(
    async (event) => {
      event.preventDefault();

      if (!email.trim() || !senha.trim()) {
        setStatus({ type: 'error', message: 'Preencha e-mail e senha para continuar.' });
        return;
      }

      setLoading(true);
      setStatus(null);

      try {
        if (modo === 'login') {
          await auth.signInWithEmailAndPassword(email, senha);
          setStatus({ type: 'success', message: 'Login realizado com sucesso! Bem-vindo de volta à sua automação.' });
        } else {
          await auth.createUserWithEmailAndPassword(email, senha);
          setStatus({
            type: 'success',
            message: 'Cadastro realizado com sucesso! Agora é só ativar suas jornadas com a IA Vendedora.',
          });
        }
      } catch (error) {
        setStatus({ type: 'error', message: traduzirErroFirebase(error) });
      } finally {
        setLoading(false);
      }
    },
    [email, senha, modo]
  );

  const handleModeToggle = useCallback(() => {
    setModo((current) => (current === 'login' ? 'cadastro' : 'login'));
    setStatus(null);
  }, []);

  const handlePasswordReset = useCallback(async () => {
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Informe o e-mail para receber o link de redefinição.' });
      return;
    }

    try {
      await auth.sendPasswordResetEmail(email);
      setStatus({ type: 'success', message: 'Enviamos um link de redefinição para o seu e-mail.' });
    } catch (error) {
      setStatus({ type: 'error', message: traduzirErroFirebase(error) });
    }
  }, [email]);

  return (
    <section className="auth-card">
      <header>
        <h2>{meta.title}</h2>
        <p>{meta.subtitle}</p>
      </header>

      {status && (
        <div className={`status-message ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleAuth}>
        <div className="input-group">
          <label htmlFor="email">E-mail corporativo</label>
          <input
            id="email"
            type="email"
            placeholder="nome@empresa.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
            required
          />
        </div>

        <div className="auth-actions">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Processando…' : meta.submitLabel}
          </button>
          <button className="btn-secondary" type="button" onClick={handleModeToggle}>
            {modo === 'login' ? 'Quero criar minha conta IA Vendedora' : 'Já tenho uma conta IA Vendedora'}
          </button>
        </div>
      </form>

      <footer className="auth-footer">
        <span>
          Precisa de suporte? Fale com o time da IA Vendedora pelo chat integrado ou envie um e-mail para
          suporte@iavendedora.com.
        </span>
        {modo === 'login' && (
          <button type="button" onClick={handlePasswordReset}>
            Esqueci minha senha
          </button>
        )}
      </footer>
    </section>
  );
}

function traduzirErroFirebase(error) {
  if (!error || typeof error.code !== 'string') {
    return 'Não foi possível concluir a operação. Tente novamente em instantes.';
  }

  const mensagens = {
    'auth/invalid-email': 'O e-mail informado é inválido.',
    'auth/user-disabled': 'Esta conta foi desativada. Entre em contato com o suporte.',
    'auth/user-not-found': 'Não encontramos uma conta com este e-mail.',
    'auth/wrong-password': 'Senha incorreta. Verifique seus dados e tente novamente.',
    'auth/email-already-in-use': 'Este e-mail já está vinculado a uma conta IA Vendedora.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/network-request-failed': 'Não foi possível conectar. Verifique sua internet e tente outra vez.',
  };

  return mensagens[error.code] || 'Algo deu errado. Tente novamente em instantes.';
}
