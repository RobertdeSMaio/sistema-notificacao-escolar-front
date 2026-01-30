import { Menu, X } from "lucide-react"; // Sugestão de biblioteca de ícones
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex flex-col h-screen bg-[#31A8A8] transition-all duration-300 ${isOpen ? "w-70" : "w-20"}`}
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
                <img src="escola.png" alt="Escola" className="w-20 h-20" />
              </p>
            ) : (
              <p>
                <img src="escola.png" alt="Escola" className="w-10 h-10" />
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
                <img src="casa.png" alt="H" className="w-4 h-4" />
              </p>
            )}
          </div>
        </Link>
        <Link to="/">
          <div className=" flex justify-center p-2 rounded-md hover:bg-[#288a8a] transition-colors">
            {isOpen ? (
              <p>Avisos</p>
            ) : (
              <p>
                <img src="aviso.png" alt="aviso" className="h-4 w-4" />
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
                <img src="painel.png" alt="painel" className="h-4 w-4" />
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
              <img src="saida.png" alt="saida" className="h-4 w-4" />
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
