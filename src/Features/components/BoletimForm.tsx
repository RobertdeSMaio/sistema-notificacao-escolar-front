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

const campoVazio = (materia: string) => ({
  materia,
  nota1: "",
  falta1: "",
  nota2: "",
  falta2: "",
  nota3: "",
  falta3: "",
  nota4: "",
  falta4: "",
  notaFinal: "",
  faltaFinal: "",
});

export default function BoletimForm({ studentId }) {
  const [rows, setRows] = useState(MATERIAS.map(campoVazio));
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

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
            return found
              ? {
                  materia,
                  nota1: found.nota1 ?? "",
                  falta1: found.falta1 ?? "",
                  nota2: found.nota2 ?? "",
                  falta2: found.falta2 ?? "",
                  nota3: found.nota3 ?? "",
                  falta3: found.falta3 ?? "",
                  nota4: found.nota4 ?? "",
                  falta4: found.falta4 ?? "",
                  notaFinal: found.notaFinal ?? "",
                  faltaFinal: found.faltaFinal ?? "",
                }
              : campoVazio(materia);
          }),
        );
      });
  }, [studentId]);

  const handleChange = (index: number, field: string, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = rows.map((row) => ({
      studentId,
      materia: row.materia,
      nota1: row.nota1 !== "" ? Number(row.nota1) : null,
      falta1: row.falta1 !== "" ? Number(row.falta1) : null,
      nota2: row.nota2 !== "" ? Number(row.nota2) : null,
      falta2: row.falta2 !== "" ? Number(row.falta2) : null,
      nota3: row.nota3 !== "" ? Number(row.nota3) : null,
      falta3: row.falta3 !== "" ? Number(row.falta3) : null,
      nota4: row.nota4 !== "" ? Number(row.nota4) : null,
      falta4: row.falta4 !== "" ? Number(row.falta4) : null,
      notaFinal: row.notaFinal !== "" ? Number(row.notaFinal) : null,
      faltaFinal: row.faltaFinal !== "" ? Number(row.faltaFinal) : null,
    }));

    await fetch(
      "https://sistema-notificacao-escolar-back.onrender.com/api/Boletim/Save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full text-center text-xs border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#088395]";

  return (
    <div className="space-y-6">
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
                    <td key={notaKey} className="p-1 border border-gray-300">
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={row[notaKey]}
                        onChange={(e) =>
                          handleChange(i, notaKey, e.target.value)
                        }
                        className={inputClass}
                      />
                    </td>
                    <td key={faltaKey} className="p-1 border border-gray-300">
                      <input
                        type="number"
                        min={0}
                        value={row[faltaKey]}
                        onChange={(e) =>
                          handleChange(i, faltaKey, e.target.value)
                        }
                        className={inputClass}
                      />
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#088395] hover:bg-[#066a7a] disabled:bg-slate-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
      >
        {loading ? "Salvando..." : saved ? "Salvo! ✓" : "Salvar Boletim"}
      </button>
    </div>
  );
}
