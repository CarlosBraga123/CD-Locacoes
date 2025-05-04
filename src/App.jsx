import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Construtoras from "./components/Construtoras";
import Obras from "./components/Obras";
import Atividades from "./components/Atividades";
import RelatorioFinanceiro from "./components/RelatorioFinanceiro";
import RelatorioServicos from "./components/RelatorioServicos";
import DetalhesObra from "./components/DetalhesObra";
import BackupImportacao from "./components/BackupImportacao";
import Configuracoes from "./components/Configuracoes";

export default function App() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [menuAberto, setMenuAberto] = useState(false);

  const renderTitle = () => {
    switch (selectedPage) {
      case "dashboard":
        return "Painel de Controle";
      case "construtoras":
        return "Construtoras";
      case "obras":
        return "Obras";
      case "atividades":
        return "Atividades";
      case "relatoriofinanceiro":
        return "Relatório Financeiro";
      case "relatorioservicos":
        return "Relatório de Serviços";
      case "detalhesobra":
        return "Detalhes da Obra";
      case "backup":
        return "Backup";
      case "configuracoes":
        return "Configurações";
      default:
        return "CD Locações";
    }
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard />;
      case "construtoras":
        return <Construtoras />;
      case "obras":
        return <Obras />;
      case "atividades":
        return <Atividades />;
      case "relatoriofinanceiro":
        return <RelatorioFinanceiro />;
      case "relatorioservicos":
        return <RelatorioServicos />;
      case "detalhesobra":
        return <DetalhesObra />;
      case "backup":
        return <BackupImportacao />;
      case "configuracoes":
        return <Configuracoes />;
      default:
        return <div className="p-4">Página não encontrada</div>;
    }
  };

  return (
    <div className="flex h-screen text-gray-800">
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white border shadow-md p-2 rounded"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </button>

      <aside
        className={
          "sm:block " +
          (menuAberto ? "block fixed inset-0 bg-white z-40 w-64 p-4" : "hidden")
        }
      >
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo da empresa" className="h-12 w-auto mb-2" />
          <h1 className="text-xl font-semibold">CD Locações</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <button onClick={() => { setSelectedPage("dashboard"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            🏠 Início
          </button>
          <button onClick={() => { setSelectedPage("construtoras"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            🏗️ Construtoras
          </button>
          <button onClick={() => { setSelectedPage("obras"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            🧱 Obras
          </button>
          <button onClick={() => { setSelectedPage("atividades"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            📋 Atividades
          </button>
          <button onClick={() => { setSelectedPage("relatoriofinanceiro"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            💰 Relatório Financeiro
          </button>
          <button onClick={() => { setSelectedPage("relatorioservicos"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            📄 Relatório de Serviços
          </button>
          <button onClick={() => { setSelectedPage("detalhesobra"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            📌 Detalhes da Obra
          </button>
          <button onClick={() => { setSelectedPage("backup"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            💾 Backup
          </button>
          <button onClick={() => { setSelectedPage("configuracoes"); setMenuAberto(false); }} className="text-left hover:text-blue-600">
            ⚙️ Configurações
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-white overflow-auto pt-16 sm:pt-0">
        <div className="sm:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center font-semibold text-lg">
          {renderTitle()}
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
