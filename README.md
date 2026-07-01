# Gerenciador de Tarefas

Projeto fullstack de gerenciamento de tarefas com backend em **.NET / C#** e frontend em **React**.

---

## 🛠️ Stack

| Camada    | Tecnologia         |
|-----------|--------------------|
| Backend   | .NET 10 / C#       |
| Frontend  | React (Vite)       |
| Banco     | SQLite (via EF Core) |


## Pré-requisitos

- [.NET SDK 10.0]
- [Node.js + npm]


## Como rodar

### Backend

```bash
cd ApiKoode
dotnet restore
dotnet ef database update   # cria o app.db a partir das migrations
dotnet run                  # sobe em http://localhost:5191
```

### Frontend

Abra um novo terminal e rode:

```bash
cd FrontKoode
npm install
npm run dev                 # sobe em http://localhost:5173
```


## Endpoints da API

Base URL: `http://localhost:5191`

| Método   | Rota           | Descrição                                         |
|----------|----------------|---------------------------------------------------|
| `POST`   | `/tasks`       | Cria uma nova tarefa                              |
| `GET`    | `/tasks`       | Retorna todas as tarefas salvas                   |
| `PUT`    | `/tasks/{id}`  | Atualiza uma tarefa existente *(exceto status `done`)* |
| `DELETE` | `/tasks/{id}`  | Remove uma tarefa existente                       |

### POST `/tasks`

**Request body:**
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

Tarefas com status `done` não podem ser atualizadas via `PUT`.
