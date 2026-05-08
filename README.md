# DJ Music System

Atividade Prática - API simples para registro, login e consulta de músicas com autenticação JWT.

## Endpoints

### `POST /register`

Registra um novo usuário.

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Retorno:
- `201` quando o usuário for registrado.


### `POST /login`

Faz login e retorna um token JWT.

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Retorno:
- `200` com `{ "token": "..." }` se as credenciais estiverem corretas.
- `401` se credenciais inválidas.


### `GET /musicas`

Retorna uma lista de músicas protegida por JWT.

```json
[
  { "id": 1, "titulo": "Música A", "artista": "DJ A" },
  { "id": 2, "titulo": "Música B", "artista": "DJ B" }
]
```

Retorno:
- `200` com uma lista de músicas.
- `403` se o token não for fornecido ou for inválido.
