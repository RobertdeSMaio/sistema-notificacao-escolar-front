# 🏫 Sistema de Notificação Escolar

Sistema completo para gerenciamento escolar com notificações, boletins e dashboard de estatísticas. Composto por um back-end em C# com ASP.NET Core e um front-end em React com TypeScript.

---

## 🔗 Links

- **Front-end (Produção):** [sistema-escolar-gules.vercel.app](https://sistema-escolar-gules.vercel.app)
- **Back-end (API):** [sistema-notificacao-escolar-back.onrender.com](https://sistema-notificacao-escolar-back.onrender.com)
- **Documentação Swagger:** [sistema-notificacao-escolar-back.onrender.com/index.html](https://sistema-notificacao-escolar-back.onrender.com/index.html)

---

## 📦 Repositórios

| Projeto | Repositório |
|--------|------------|
| Front-end | [RobertdeSMaio/sistema-notificacao-escolar-front](https://github.com/RobertdeSMaio/sistema-notificacao-escolar-front) |
| Back-end | [RobertdeSMaio/sistema-notificacao-escolar-back](https://github.com/RobertdeSMaio/sistema-notificacao-escolar-back) |

---

## 🚀 Tecnologias

### Back-end
- **ASP.NET Core** (.NET 8)
- **Entity Framework Core** + **Npgsql**
- **PostgreSQL** via [Neon](https://neon.tech)
- **JWT** para autenticação
- **PBKDF2/SHA256** para hash de senhas
- **Swagger UI** para documentação
- **DotNetEnv** para variáveis de ambiente

### Front-end
- **React 19** + **Vite 7**
- **TypeScript**
- **Tailwind CSS v4**
- **Radix UI** + **shadcn/ui**
- **React Router DOM v7**
- **Axios** para requisições HTTP
- **Formik** + **Yup** para formulários
- **Recharts** para gráficos
- **Lucide React** para ícones
- **Sonner** para notificações toast

---

## 📁 Estrutura do Projeto

### Back-end
```
src/
├── Controllers/
│   ├── AuthController.cs         # Login e Register
│   ├── NotificationController.cs # CRUD de notificações
│   ├── BoletimController.cs      # CRUD de boletins
│   ├── DashController.cs         # Dashboard de estatísticas
│   └── UserController.cs         # Gerenciamento de usuários
├── Services/
│   ├── UserService.cs
│   ├── NotificationService.cs
│   ├── BoletimService.cs
│   └── DashService.cs
├── Interfaces/
│   ├── IUserService.cs
│   ├── INotificationService.cs
│   ├── IBoletimService.cs
│   └── IDashService.cs
├── Models/
│   └── Entities/
│       ├── User.cs
│       ├── Notification.cs
│       └── Boletim.cs
├── DTOs/
│   ├── NotificationDTO.cs
│   ├── BoletimDTO.cs
│   └── DashDTO.cs
├── Data/
│   └── Context/
│       └── MyDbContext.cs
└── Program.cs
```

### Front-end
```
sistema-notificacao-escolar-front/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Cards.tsx
│   │       ├── CardWarnings.tsx
│   │       ├── DashCard.tsx
│   │       ├── index.md
│   │       ├── pesquisa.tsx
│   │       └── SideBar.tsx
│   ├── Features/
│   │   ├── components/
│   │   │   ├── BoletimCard.tsx
│   │   │   ├── BoletimForm.tsx
│   │   │   ├── Classes.tsx
│   │   │   ├── index.md
│   │   │   ├── NotificationCard.tsx
│   │   │   └── NotificationForms.tsx
│   │   ├── hooks/
│   │   ├── services/
│   │   └── students/
│   │       ├── Iform.tsx
│   │       └── index.md
│   ├── pages/
│   │   ├── AdminPainel.tsx
│   │   ├── Boletim.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EditUser.tsx
│   │   ├── Home.tsx
│   │   ├── index.md
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Users.tsx
│   │   └── Warnings.tsx
│   ├── public/
│   │   └── Assets/
│   │       ├── aviso.png
│   │       ├── boletim-de-noticias.png
│   │       ├── casa.png
│   │       ├── editar.png
│   │       ├── escola.png
│   │       ├── index.md
│   │       ├── packard-bell.png
│   │       ├── painel.png
│   │       └── saida.png
│   ├── routes/
│   │   └── routes.tsx
│   ├── styles/
│   ├── declarations.d.ts
│   └── main.tsx
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── estruturaDB.erd.json
└── index.html
```

---

## 🗄️ Modelos do Banco

### users
| Campo        | Tipo         | Descrição                    |
|--------------|--------------|------------------------------|
| Id           | UUID (PK)    | ID do usuário                |
| Name         | VARCHAR(150) | Nome completo                |
| Email        | VARCHAR(254) | E-mail                       |
| PasswordHash | TEXT         | Senha hash PBKDF2/SHA256     |
| Cpf          | VARCHAR      | CPF                          |
| Role         | VARCHAR      | Admin, Teacher, Principal, Student, Parent |
| Telefone     | VARCHAR      | Telefone opcional            |
| IsActive     | BOOLEAN      | Usuário ativo                |
| CreatedAt    | TIMESTAMP    | Data de criação              |
| UpdatedAt    | TIMESTAMP    | Data de atualização          |

### notifications
| Campo         | Tipo      | Descrição                        |
|---------------|-----------|----------------------------------|
| Id            | UUID (PK) | ID da notificação                |
| Title         | TEXT      | Título                           |
| Content       | TEXT      | Conteúdo                         |
| Target        | TEXT      | `all` = geral, `specific` = direto |
| Author        | TEXT      | Autor da notificação             |
| RecipientsIds | TEXT      | IDs dos destinatários (separados por vírgula) |
| CreatedAt     | TIMESTAMP | Data de criação                  |

### boletins
| Campo        | Tipo          | Descrição              |
|--------------|---------------|------------------------|
| Id           | UUID (PK)     | ID do boletim          |
| StudentId    | UUID (FK)     | Referência ao aluno    |
| Materia      | TEXT          | Nome da matéria        |
| Nota1~4      | DECIMAL(18,2) | Notas por bimestre     |
| Falta1~4     | INTEGER       | Faltas por bimestre    |
| NotaFinal    | DECIMAL(18,2) | Nota final             |
| FaltaFinal   | INTEGER       | Faltas finais          |
| CreatedAt    | TIMESTAMP     | Data de criação        |
| UpdatedAt    | TIMESTAMP     | Data de atualização    |

---

## 🔐 Perfis de Acesso

| Role      | Notificações | Boletim         | Dashboard | Admin Painel |
|-----------|-------------|-----------------|-----------|--------------|
| Admin     | Envia e vê todas | Edita todos | ✅ | ✅ |
| Teacher   | Envia e vê todas | Edita todos | ✅ | ✅ |
| Principal | Envia e vê todas | Edita todos | ✅ | ✅ |
| Student   | Vê as próprias  | Vê o próprio | ❌ | ❌ |
| Parent    | Vê as próprias  | Vê do filho  | ❌ | ❌ |

---

## 📌 Endpoints da API

### 🔑 Autenticação
| Método | Rota                  | Descrição               | Auth |
|--------|-----------------------|-------------------------|------|
| POST   | /api/User/register    | Registrar novo usuário  | ❌   |
| POST   | /api/User/login       | Login e geração de token| ❌   |

### 📣 Notificações
| Método | Rota                        | Descrição                    | Auth |
|--------|-----------------------------|------------------------------|------|
| POST   | /api/Notification/Post      | Criar notificação            | ✅   |
| GET    | /api/Notification/Get       | Listar notificações          | ❌   |

### 📋 Boletim
| Método | Rota                        | Descrição                    | Auth |
|--------|-----------------------------|------------------------------|------|
| POST   | /api/Boletim/Save           | Salvar/atualizar boletim     | ✅   |
| GET    | /api/Boletim/{studentId}    | Buscar boletim por aluno     | ❌   |

### 📊 Estatísticas
| Método | Rota                        | Descrição                    | Auth |
|--------|-----------------------------|------------------------------|------|
| GET    | /api/Estatisticas           | Buscar estatísticas gerais   | ❌   |

---

## ⚙️ Instalação

### Back-end

```bash
# Clone o repositório
git clone https://github.com/RobertdeSMaio/sistema-notificacao-escolar-back.git
cd sistema-notificacao-escolar-back

# Restaure as dependências
dotnet restore
```

Crie o arquivo `.env` na raiz:

```env
POSTGRES_CONNECTION=postgresql://usuario:senha@host/banco?sslmode=require
JWT_SECRET=sua_chave_secreta_aqui
```

```bash
# Rode a aplicação
dotnet run
```

### Front-end

```bash
# Clone o repositório
git clone https://github.com/RobertdeSMaio/sistema-notificacao-escolar-front.git
cd sistema-notificacao-escolar-front

# Instale as dependências (Node.js >= 20 necessário)
npm install
```

Crie o arquivo `.env` na raiz:

```env
VITE_API_URL=https://sistema-notificacao-escolar-back.onrender.com
```

```bash
# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 📄 Documentação Swagger

Acesse a documentação interativa em:
```
https://sistema-notificacao-escolar-back.onrender.com/html
```

---

## 📦 Requisitos

| Ferramenta | Versão mínima |
|------------|--------------|
| Node.js    | >= 20.0.0    |
| .NET       | >= 8.0       |
| PostgreSQL | >= 14        |

---

## 👤 Autor

**Robert de S. Maio**
[github.com/RobertdeSMaio](https://github.com/RobertdeSMaio)
