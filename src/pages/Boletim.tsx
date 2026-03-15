import { useEffect, useState } from "react";
import Select from "react-select";
import BoletimCard from "../Features/components/BoletimCard";

const VIEW_ROLES = ["Student", "Parent"];
const EDIT_ROLES = ["Admin", "Teacher", "Principal"];

export default function BoletimPage() {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (!EDIT_ROLES.includes(role)) return;

    fetch(
      "https://sistema-notificacao-escolar-back.onrender.com/api/User/UserList",
    )
      .then((r) => r.json())
      .then((data) =>
        setStudents(
          data
            .filter((u) => u.role === "Student")
            .map((u) => ({ value: u.id, label: `${u.name} - ${u.cpf}` })),
        ),
      );
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Boletim Escolar</h2>

      {VIEW_ROLES.includes(role) && <BoletimCard studentId={userId} />}

      {EDIT_ROLES.includes(role) && (
        <>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Selecione o Aluno
            </label>
            <Select
              options={students}
              onChange={setSelectedStudent}
              placeholder="Digite o nome para buscar..."
              noOptionsMessage={() => "Nenhum aluno encontrado"}
            />
          </div>

          {selectedStudent ? (
            <BoletimCard studentId={selectedStudent.value} />
          ) : (
            <p className="text-slate-500 text-sm">
              Selecione um aluno para visualizar o boletim.
            </p>
          )}
        </>
      )}
    </div>
  );
}
