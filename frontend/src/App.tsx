import { useState } from "react";
import PessoasPage from "./pages/Pessoas/PessoasPage.tsx";
import CategoriasPage from "./pages/Categorias/CategoriasPage.tsx";
import TransacoesPage from "./pages/Transacoes/TransacoesPage.tsx";
import RelatoriosPage from "./pages/Relatorios/RelatoriosPage.tsx";

function App() {
  const [aba, setAba] = useState("pessoas");

  return (
    <div className="container">

      <h1>Controle de Gastos</h1>

      <div className="menu">
        <button onClick={() => setAba("pessoas")}>Pessoas</button>
        <button onClick={() => setAba("categorias")}>Categorias</button>
        <button onClick={() => setAba("transacoes")}>Transações</button>
        <button onClick={() => setAba("relatorios")}>Relatórios</button>
      </div>

      {aba == "pessoas" && <PessoasPage />}
      {aba == "categorias" && <CategoriasPage />}
      {aba == "transacoes" && <TransacoesPage />}
      {aba == "relatorios" && <RelatoriosPage />}

    </div>
  );
}

export default App;