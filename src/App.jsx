import React from 'react';
import Auth from './Auth';

function App() {
  return (
    <div className="app">
      <div className="auth-layout">
        <section className="lumen-panel">
          <span className="panel-badge">Lumen Experience</span>
          <h1>Energia inteligente para o seu negócio</h1>
          <p>
            Centralize em um só lugar a gestão dos planos, dos contratos e da
            performance energética da sua empresa. Simplifique seu dia a dia com
            insights acionáveis e automações criadas para acelerar decisões.
          </p>
          <div className="panel-stats">
            <div className="panel-stat">
              <strong>98%</strong>
              <span>Satisfação das equipes conectadas ao Lumen Hub</span>
            </div>
            <div className="panel-stat">
              <strong>12x</strong>
              <span>Retorno médio em eficiência energética</span>
            </div>
            <div className="panel-stat">
              <strong>24/7</strong>
              <span>Monitoramento com alertas inteligentes</span>
            </div>
          </div>
        </section>
        <Auth />
      </div>
    </div>
  );
}

export default App;
