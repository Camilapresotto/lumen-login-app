import React from 'react';
import Auth from './Auth';

function App() {
  return (
    <div className="app">
      <div className="auth-layout">
        <section className="lumen-panel">
          <span className="panel-badge">IA VENDEDORA™</span>
          <h1>A IA que transforma o seu negócio em uma máquina de vendas invisível.</h1>
          <p className="panel-subtitle">
            Conteúdos, funis, criativos e automações prontos para você escalar, mesmo que nunca tenha
            vendido online.
          </p>
          <p className="panel-description">
            Com a IA Vendedora, você automatiza postagens, cria páginas de vendas premium, recebe
            sugestões de campanhas e ainda monitora seus resultados — sem precisar de uma equipe.
          </p>
          <div className="panel-stats">
            <div className="panel-stat">
              <span className="panel-stat-icon" aria-hidden>💬</span>
              <span className="panel-stat-text">92% das marcas viram crescimento nas vendas em menos de 30 dias.</span>
            </div>
            <div className="panel-stat">
              <span className="panel-stat-icon" aria-hidden>🚀</span>
              <span className="panel-stat-text">15x mais velocidade na criação de criativos e conteúdos.</span>
            </div>
            <div className="panel-stat">
              <span className="panel-stat-icon" aria-hidden>🔁</span>
              <span className="panel-stat-text">100% das tarefas repetitivas automatizadas.</span>
            </div>
          </div>
        </section>
        <Auth />
      </div>
    </div>
  );
}

export default App;
