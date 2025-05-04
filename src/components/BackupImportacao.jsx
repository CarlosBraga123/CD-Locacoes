import { useState } from "react";

export default function BackupImportacao() {
  const [importado, setImportado] = useState(false);

  const exportar = () => {
    const dados = {
      construtoras: JSON.parse(localStorage.getItem("construtoras") || "[]"),
      obras: JSON.parse(localStorage.getItem("obras") || "[]"),
      atividades: JSON.parse(localStorage.getItem("atividades") || "[]"),
      pecasBalancinho: JSON.parse(localStorage.getItem("pecasBalancinho") || "{}"),
      pecasAncoragem: JSON.parse(localStorage.getItem("pecasAncoragem") || "{}"),
      valoresServicos: JSON.parse(localStorage.getItem("valoresServicos") || "{}")
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup_cd_locacoes.json";
    link.click();
  };

  const importar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.construtoras) localStorage.setItem("construtoras", JSON.stringify(json.construtoras));
        if (json.obras) localStorage.setItem("obras", JSON.stringify(json.obras));
        if (json.atividades) {
          const existentes = JSON.parse(localStorage.getItem("atividades") || "[]");
          const combinadas = [...existentes, ...json.atividades];
          localStorage.setItem("atividades", JSON.stringify(combinadas));
        }
        if (json.pecasBalancinho) localStorage.setItem("pecasBalancinho", JSON.stringify(json.pecasBalancinho));
        if (json.pecasAncoragem) localStorage.setItem("pecasAncoragem", JSON.stringify(json.pecasAncoragem));
        if (json.valoresServicos) localStorage.setItem("valoresServicos", JSON.stringify(json.valoresServicos));
        setImportado(true);
      } catch (err) {
        alert("Erro ao importar JSON. Verifique o arquivo.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">💾 Backup e Importação</h2>

      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded text-sm text-gray-800">
        <p><strong>📥 Importar Backup de Atividades</strong></p>
        <p>Você pode carregar registros antigos ou planilhas convertidas diretamente para o sistema.</p>
        <ul className="list-disc ml-5 my-2">
          <li>Clique no botão <strong>“Importar JSON”</strong></li>
          <li>Selecione um arquivo <code>.json</code> com atividades no formato do app</li>
          <li>Os dados serão adicionados à lista de atividades</li>
        </ul>
        <p className="text-gray-600 text-xs">⚠️ Campos em branco podem ser completados depois manualmente.</p>
        <p className="text-gray-600 text-xs">Exemplo: <code>atividades_importadas_abril.json</code></p>
      </div>

      <div className="flex gap-4">
        <button onClick={exportar} className="bg-blue-600 text-white px-4 py-2 rounded">
          Exportar Backup
        </button>
        <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
          Importar JSON
          <input type="file" accept=".json" onChange={importar} className="hidden" />
        </label>
      </div>

      {importado && (
        <div className="text-green-600 text-sm mt-2">✅ Importação concluída com sucesso!</div>
      )}
    </div>
  );
}
