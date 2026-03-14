import { useEffect, useState } from "react";

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

export default function BoletimCard({ studentId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    fetch(
      `https://sistema-notificacao-escolar-back.onrender.com/api/Boletim/${studentId}`,
    )
      .then((r) => r.json())
      .then((data) => {
        setRows(
          MATERIAS.map((materia) => {
            const found = data.find((d) => d.materia === materia);
            return found ?? { materia };
          }),
        );
        setLoading(false);
      });
  }, [studentId]);

  if (loading)
    return (
      <div className="text-center text-gray-500">Carregando boletim...</div>
    );

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#088395] text-white">
            <th
              rowSpan={2}
              className="p-2 border border-gray-300 text-left min-w-40"
            >
              Componentes Curriculares
            </th>
            {[
              "1° Bimestre",
              "2° Bimestre",
              "3° Bimestre",
              "4° Bimestre",
              "Final",
            ].map((b) => (
              <th
                key={b}
                colSpan={2}
                className="p-2 border border-gray-300 text-center"
              >
                {b}
              </th>
            ))}
          </tr>
          <tr className="bg-[#066a7a] text-white">
            {Array(5)
              .fill(["Nota", "Falta"])
              .flat()
              .map((h, i) => (
                <th
                  key={i}
                  className="p-2 border border-gray-300 text-center min-w-12"
                >
                  {h}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.materia}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              <td className="p-2 border border-gray-300 font-medium text-slate-700">
                {row.materia}
              </td>
              {[
                ["nota1", "falta1"],
                ["nota2", "falta2"],
                ["nota3", "falta3"],
                ["nota4", "falta4"],
                ["notaFinal", "faltaFinal"],
              ].map(([notaKey, faltaKey]) => (
                <>
                  <td
                    key={notaKey}
                    className="p-2 border border-gray-300 text-center"
                  >
                    {row[notaKey] ?? "-"}
                  </td>
                  <td
                    key={faltaKey}
                    className="p-2 border border-gray-300 text-center"
                  >
                    {row[faltaKey] ?? "-"}
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
