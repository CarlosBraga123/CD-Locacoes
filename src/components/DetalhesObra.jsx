import { useEffect, useState } from "react";

export default function DetalhesObra() {
  const [obras, setObras] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [obraSelecionada, setObraSelecionada] = useState(null);

  useEffect(() => {
    const obrasSalvas = JSON.parse(localStorage.getItem("obras") || "[]");
    const atividadesSalvas = JSON.parse(localStorage.getItem("atividades") || "[]");
    setObras(obrasSalvas);
    setAtividades(atividadesSalvas);
  }, []);

  const resumo = (obra) => {
    const relacionadas = atividades.filter((a) => a.obra === obra.nome && a.construtora === obra.construtora && a.dataLiberacao);
    const total = { instalação: 0, remoção: 0, manutenção: 0, deslocamento: 0, ascensão: 0 };
    relacionadas.forEach((a) => {
      const s = a.servico.toLowerCase();
      if (total[s] !== undefined) total[s]++;
    });
    const saldo = total.instalação + total.ascensão - total.remoção;
    return { ...total, saldo };
  };

  const enviarWhatsApp = (obra) => {
    const r = resumo(obra);
    const texto = `📌 *Detalhes da Obra - CD Locações*\n\n` +
      `🏗️ *Construtora:* ${obra.construtora}\n` +
      `🏢 *Obra:* ${obra.nome}\n` +
      `👷 *Engenheiro:* ${obra.engenheiro}\n` +
      `📍 *Endereço:* ${obra.endereco}\n` +
      `📝 *Observações:* ${obra.observacoes || "—"}\n\n` +
      `📊 *Resumo de Serviços:*\n` +
      `• Instalações: ${r.instalação}\n` +
      `• Ascensões: ${r.ascensão}\n` +
      `• Remoções: ${r.remoção}\n` +
      `• Manutenções: ${r.manutenção}\n` +
      `• Deslocamentos: ${r.deslocamento}\n` +
      `✅ *Saldo de Equipamentos Ativos:* ${r.saldo}`;

    const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(link, "_blank");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">📌 Detalhes da Obra</h2>

      <select
        onChange={(e) => {
          const selecionada = obras.find((o) => o.id === parseInt(e.target.value));
          setObraSelecionada(selecionada || null);
        }}
        className="border p-2 rounded w-full"
      >
        <option value="">Selecione uma obra</option>
        {obras.map((obra) => (
          <option key={obra.id} value={obra.id}>
            {obra.nome} ({obra.construtora})
          </option>
        ))}
      </select>

      {obraSelecionada && (
        <div className="border rounded p-4 space-y-2 shadow bg-gray-50">
          <h3 className="font-bold text-lg">{obraSelecionada.nome}</h3>
          <p><strong>Construtora:</strong> {obraSelecionada.construtora}</p>
          <p><strong>Engenheiro:</strong> {obraSelecionada.engenheiro}</p>
          <p><strong>Endereço:</strong> {obraSelecionada.endereco}</p>
          <p><strong>Observações:</strong> {obraSelecionada.observacoes}</p>
          <hr />
          <h4 className="font-semibold">Resumo de Serviços</h4>
          {(() => {
            const r = resumo(obraSelecionada);
            return (
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Instalações: {r.instalação}</li>
                <li>Ascensões (Mini Grua): {r.ascensão}</li>
                <li>Remoções: {r.remoção}</li>
                <li>Manutenções: {r.manutenção}</li>
                <li>Deslocamentos: {r.deslocamento}</li>
                <li><strong>Saldo de Equipamentos Ativos: {r.saldo}</strong></li>
              </ul>
            );
          })()}
          <button
            onClick={() => enviarWhatsApp(obraSelecionada)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enviar via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
