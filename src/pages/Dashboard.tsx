import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const API = "https://sistema-notificacao-escolar-back.onrender.com";

const MATERIAS = [
  "Língua Portuguesa",
  "Matemática",
  "Ciências",
  "História",
  "Geografia",
  "Arte",
  "Educação Física",
  "Educação Religiosa",
];

function getColor(value: number) {
  if (value >= 7) return "#10b981";
  if (value >= 5) return "#f59e0b";
  return "#ef4444";
}

function KpiCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}) {
  return (
    <div
      style={{ borderTop: `4px solid ${color}` }}
      className="bg-white rounded-xl p-5 shadow-sm"
    >
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-3xl font-bold" style={{ color }}>
        {value}
      </p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materiaFiltro, setMateriaFiltro] = useState("");

  useEffect(() => {
    const url = materiaFiltro
      ? `${API}/api/Estatisticas?materia=${encodeURIComponent(materiaFiltro)}`
      : `${API}/api/Estatisticas`;

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => controller.abort();
  }, [materiaFiltro]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#088395] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm">Carregando estatísticas...</p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-500">Nenhum dado encontrado.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Escolar
          </h1>
          <p className="text-slate-500 text-sm">
            Estatísticas de notas e frequência
          </p>
        </div>

        <select
          value={materiaFiltro}
          onChange={(e) => setMateriaFiltro(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#088395]"
        >
          <option value="">Todas as matérias</option>
          {MATERIAS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total de Alunos"
          value={data.totalAlunos}
          color="#088395"
        />
        <KpiCard
          title="Média Geral"
          value={data.mediaGeral?.toFixed(1) ?? "-"}
          subtitle="de 0 a 10"
          color={getColor(data.mediaGeral)}
        />
        <KpiCard
          title="Total de Faltas"
          value={data.totalFaltas}
          color="#f59e0b"
        />
        <KpiCard title="Matérias" value={data.totalMaterias} color="#6366f1" />
      </div>

      {/* Gráficos linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Média de Notas por Matéria
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data.mediasPorMateria}
              layout="vertical"
              margin={{ left: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="materia"
                tick={{ fontSize: 11 }}
                width={120}
              />
              <Tooltip formatter={(v: number) => v.toFixed(1)} />
              <Bar dataKey="media" radius={[0, 4, 4, 0]}>
                {data.mediasPorMateria?.map((entry, i) => (
                  <Cell key={i} fill={getColor(entry.media)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Total de Faltas por Matéria
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data.faltasPorMateria}
              layout="vertical"
              margin={{ left: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="materia"
                tick={{ fontSize: 11 }}
                width={120}
              />
              <Tooltip />
              <Bar dataKey="totalFaltas" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Evolução das Notas por Bimestre
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.evolucaoPorBimestre}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bimestre" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => v.toFixed(1)} />
              <Line
                type="monotone"
                dataKey="media"
                stroke="#088395"
                strokeWidth={2}
                dot={{ fill: "#088395", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Ranking de Alunos (Média Final)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data.rankingAlunos}
              layout="vertical"
              margin={{ left: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="aluno"
                tick={{ fontSize: 11 }}
                width={100}
              />
              <Tooltip formatter={(v: number) => v.toFixed(1)} />
              <Bar dataKey="mediaFinal" radius={[0, 4, 4, 0]}>
                {data.rankingAlunos?.map((entry, i) => (
                  <Cell key={i} fill={getColor(entry.mediaFinal)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl p-5 shadow-sm overflow-x-auto">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Médias por Matéria
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#088395] text-white">
              <th className="p-3 text-left rounded-tl-lg">Matéria</th>
              <th className="p-3 text-center">Média</th>
              <th className="p-3 text-center">Total Faltas</th>
              <th className="p-3 text-center rounded-tr-lg">Situação</th>
            </tr>
          </thead>
          <tbody>
            {data.mediasPorMateria?.map((item, i) => {
              const faltas = data.faltasPorMateria?.find(
                (f) => f.materia === item.materia,
              );
              return (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="p-3 font-medium text-slate-700">
                    {item.materia}
                  </td>
                  <td
                    className="p-3 text-center font-bold"
                    style={{ color: getColor(item.media) }}
                  >
                    {item.media.toFixed(1)}
                  </td>
                  <td className="p-3 text-center text-slate-600">
                    {faltas?.totalFaltas ?? 0}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        item.media >= 7
                          ? "bg-green-100 text-green-700"
                          : item.media >= 5
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.media >= 7
                        ? "Aprovado"
                        : item.media >= 5
                          ? "Recuperação"
                          : "Reprovado"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
