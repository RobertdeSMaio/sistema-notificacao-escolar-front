import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconeAviso from "../../public/Assets/aviso.png";
import iconeCasa from "../../public/Assets/casa.png";
import logoEscola from "../../public/Assets/escola.png";
import iconePainel from "../../public/Assets/painel.png";
import iconeSaida from "../../public/Assets/saida.png";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebar-open");
    return savedState !== null ? JSON.parse(savedState) : true;
  });
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className={`flex flex-col  bg-[#31A8A8] transition-all duration-300 ${isOpen ? "w-70" : "w-20"}`}
    >
      <div>
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-[#288a8a] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="text-2xl font-bold text-black mb-6 text-center">
            {isOpen ? (
              <p>
                <img src={logoEscola} alt="Escola" className="w-20 h-20" />
              </p>
            ) : (
              <p>
                <img src={logoEscola} alt="Escola" className="w-10 h-10" />
              </p>
            )}
          </div>
        </div>
        <Link to="/Home">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Inicial</p>
            ) : (
              <p>
                <img src={iconeCasa} alt="H" className="w-4 h-4" />
              </p>
            )}
          </div>
        </Link>
        <Link to="/warnings">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Avisos</p>
            ) : (
              <p>
                <img src={iconeAviso} alt="aviso" className="h-4 w-4" />
              </p>
            )}
          </div>
        </Link>
        <Link to="/dashpage">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Dashboard</p>
            ) : (
              <p>
                <img src={iconePainel} alt="painel" className="h-4 w-4" />
              </p>
            )}
          </div>
        </Link>
        <Link to="/boletim">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Boletim</p>
            ) : (
              <p>
                <img src={iconeAviso} alt="boletim" className="h-4 w-4" />
              </p>
            )}
          </div>
        </Link>
        <Link to="/AdminPainel">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Admin</p>
            ) : (
              <p>
                <img src={iconeAviso} alt="admin" className="h-4 w-4" />
              </p>
            )}
          </div>
        </Link>
      </div>

      <Link to="/">
        <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
          {isOpen ? (
            <p>Log out</p>
          ) : (
            <p>
              <img src={iconeSaida} alt="saida" className="h-4 w-4" />
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
