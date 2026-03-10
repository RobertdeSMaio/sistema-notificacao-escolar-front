import DashCards from "../components/layout/DashCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashCards />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3"></div>
    </div>
  );
}

//TODO - Criar um componente de card para cada tipo de notificação (ex: faltas, notas, eventos)
//TODO - Criar um componente de gráfico para mostrar a evolução das notas ou faltas ao longo do tempo
//TODO - Criar um componente de calendário para mostrar os eventos escolares
//TODO - Criar um componente de lista para mostrar as notificações recentes
//TODO - Criar um componente de perfil para mostrar as informações do usuário e permitir a edição
//TODO - Criar um componente de configurações para permitir que o usuário configure suas preferências de notificações
//TODO - Criar um componente de mensagens para permitir que o usuário envie mensagens para a escola ou para outros usuários
//TODO - Criar um componente de logout para permitir que o usuário saia do sistema
