import { useEffect, useState } from "react";

export default function Dashboard() {
  const [recentes, setRecentes] = useState([]);
  const [agendados, setAgendados] = useState([]);
  const [obras, setObras] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const todas = JSON.parse(localStorage.getItem("atividades") || "[]");
    const listaObras = JSON.parse(localStorage.getItem("obras") || "[]");
    setObras(listaObras);

    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    const atividadesRecentes = todas
      .filter((a) => a.dataLiberacao)
      .map((a) => ({ ...a, dataObj: new Date(a.dataLiberacao) }))
      .filter((a) => a.dataObj >= seteDiasAtras && a.dataObj <= hoje)
      .sort((a, b) => b.dataObj - a.dataObj);

    const atividadesAgendadas = todas
      .filter((a) => a.dataAgendamento && !a.dataLiberacao)
      .map((a) => ({ ...a, dataObj: new Date(a.dataAgendamento) }))
      .sort((a, b) => a.dataObj - b.dataObj);

    setRecentes(atividadesRecentes);
    setAgendados(atividadesAgendadas);

    const ativos = todas.filter((a) => a.dataLiberacao).reduce(
      (acc, item) => {
        const eq = item.equipamento;
        if (item.servico === "Instalação" || item.servico === "Ascenção") {
          acc[eq] = (acc[eq] || 0) + 1;
        } else if (item.servico === "Remoção") {
          acc[eq] = (acc[eq] || 0) - 1;
        }
        return acc;
      },
      {}
    );

    setCards([
      { titulo: "Serviços nos últimos 7 dias", valor: atividadesRecentes.length, cor: "bg-blue-100" },
      { titulo: "Serviços Agendados", valor: atividadesAgendadas.length, cor: "bg-yellow-100" },
      { titulo: "Obras Cadastradas", valor: listaObras.length, cor: "bg-green-100" },
      { titulo: "Equipamentos Ativos", valor: (ativos["Balancinho"] || 0) + (ativos["Mini Grua"] || 0), cor: "bg-purple-100" },
    ]);
  }, []);

  const formatarData = (data) => {
    if (!data) return "—";
    const [y, m, d] = data.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">🏠 Painel CD Locações</h2>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`${card.cor} p-4 rounded shadow-sm`}>
            <div className="text-sm text-gray-600">{card.titulo}</div>
            <div className="text-2xl font-bold">{card.valor}</div>
          </div>
        ))}
      </div>

      {/* Próximos Agendamentos */}
      <section>
        <h3 className="text-lg font-semibold mb-2">📌 Próximos Serviços Agendados</h3>
        {agendados.length === 0 ? (
          <p className="text-gray-500">Nenhum serviço agendado.</p>
        ) : (
          <ul className="space-y-2">
            {agendados.map((a) => (
              <li key={a.id} className="border rounded p-3 bg-white shadow-sm">
                <strong>{a.servico} - {a.equipamento}</strong>
                {a.equipamento === "Balancinho" && a.tamanho ? ` [${a.tamanho}m]` : ""}<br />
                {a.construtora} / {a.obra} <br />
                Agendado: {formatarData(a.dataAgendamento)}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Atividades Recentes */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🕓 Atividades Recentes (últimos 7 dias)</h3>
        {recentes.length === 0 ? (
          <p className="text-gray-500">Nenhuma atividade recente registrada.</p>
        ) : (
          <ul className="space-y-2">
            {recentes.map((a) => (
              <li key={a.id} className="border rounded p-3 bg-white shadow-sm">
                <strong>{a.servico} - {a.equipamento}</strong>
                {a.equipamento === "Balancinho" && a.tamanho ? ` [${a.tamanho}m]` : ""}<br />
                {a.construtora} / {a.obra} <br />
                Liberado: {formatarData(a.dataLiberacao)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
