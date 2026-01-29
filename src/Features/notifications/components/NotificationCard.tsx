import { Bell, Calendar, User, Users } from "lucide-react";

interface NotificiationCardProps {
  title: string;
  content: string;
  date: Date;
  type: "all" | "specific";
}

export default function NotificationCard({
  title,
  content,
  date,
  type,
}: NotificiationCardProps) {
  return (
    <div className="max-w-md w-full bg-white border-l-4 border-blue-600 rounded-r-xl shadow-sm hover:shadow-md transition-shadow p-5 mb-4">
      <div className="flex justify-between items-start mb-3">
        {/* Badge de Categoria */}
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            type === "all"
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {type === "all" ? <Users size={12} /> : <User size={12} />}
          {type === "all" ? "Geral" : "Específico"}
        </span>

        {/* Data formatada (Simulação nativa) */}
        <span className="text-slate-400 text-xs flex items-center gap-1">
          <Calendar size={12} />
          {date?.toLocaleDateString() || new Date().toLocaleDateString("pt-BR")}
        </span>
      </div>

      <div className="flex gap-4">
        {/* Ícone Lateral */}
        <div className="bg-blue-50 p-2 rounded-full h-fit">
          <Bell className="text-blue-600" size={20} />
        </div>

        {/* Conteúdo da Mensagem */}
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
            {title || "Título da Notificação"}
          </h3>
          <p className="text-slate-600 text-sm whitespace-pre-wrap">
            {content ||
              "O conteúdo da mensagem aparecerá aqui conforme o funcionário digita..."}
          </p>
        </div>
      </div>
    </div>
  );
}
