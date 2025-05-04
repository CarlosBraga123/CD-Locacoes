import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Construtoras from "./components/Construtoras";
import Obras from "./components/Obras";
import Atividades from "./components/Atividades";
import RelatorioFinanceiro from "./components/RelatorioFinanceiro";
import RelatorioServicos from "./components/RelatorioServicos";
import DetalhesObra from "./components/DetalhesObra";
import BackupImportacao from "./components/BackupImportacao";
import EmpresaHeader from "./components/EmpresaHeader";
import Configuracoes from "./components/Configuracoes";

export default function App() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [relatorioAberto, setRelatorioAberto] = useState(false);

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
      case "relatorioFinanceiro":
        return <RelatorioFinanceiro />;
      case "relatorioServicos":
        return <RelatorioServicos />;
      case "detalhesobra":
        return <DetalhesObra />;
      case "backup":
        return <BackupImportacao />;
      default:
        return <div className="p-4">Página não encontrada</div>;
        case "configuracoes":
  return <Configuracoes />;
    }
  };

  return (
    <div className="flex h-screen text-gray-800">
      <aside className="w-64 bg-gray-100 border-r shadow-sm p-4">
        <EmpresaHeader />
        <nav className="flex flex-col space-y-2">
          <button onClick={() => setSelectedPage("dashboard")} className="text-left hover:text-blue-600">
            🏠 Início
          </button>
          <button onClick={() => setSelectedPage("construtoras")} className="text-left hover:text-blue-600">
            🏗️ Construtoras
          </button>
          <button onClick={() => setSelectedPage("obras")} className="text-left hover:text-blue-600">
            🧱 Obras
          </button>
          <button onClick={() => setSelectedPage("atividades")} className="text-left hover:text-blue-600">
            📋 Atividades
          </button>

          <div>
            <button onClick={() => setRelatorioAberto(!relatorioAberto)} className="text-left hover:text-blue-600 w-full">
              📊 Relatórios
            </button>
            {relatorioAberto && (
              <div className="ml-4 mt-1 space-y-1 text-sm">
                <button onClick={() => setSelectedPage("relatorioFinanceiro")} className="text-left hover:text-blue-600">
                  📈 Financeiro
                </button>
                <button onClick={() => setSelectedPage("relatorioServicos")} className="text-left hover:text-blue-600">
                  🛠️ Serviços
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setSelectedPage("detalhesobra")} className="text-left hover:text-blue-600">
            📌 Detalhes da Obra
          </button>
          <button onClick={() => setSelectedPage("configuracoes")} className="text-left hover:text-blue-600">
  ⚙️ Configurações
</button>
          <button onClick={() => setSelectedPage("backup")} className="text-left hover:text-blue-600">
            💾 Backup
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-white overflow-auto">{renderContent()}</main>
    </div>
  );
}
