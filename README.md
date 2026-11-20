# DJ Music System

Atividade Prática - aplicação simples para registro, login e consulta de músicas com autenticação JWT. O objetivo principal é colocar em prática os conhecimentos adiquiridos sobre implementar uma suite de testes automatizados e integrar um pipeline de Integração Contínua (CI/CD) com deploy automático.

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
- `400` quando o Email já estava registrado

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


### `GET /api-docs`

Abre a interface do Swagger UI para visualizar e testar a documentação da API

Link: https://dj-music-system.onrender.com/api-docs

## Instruções para executar e testar localmente

1. Clone o repositório

```shell
git clone https://github.com/juceliocosta/dj-music-system.git
```

2. Dentro do repositório, instale as dependências
```shell
npm install
```

3. Execute a suite de testes

```shell
npm run test
```

4. Inicialize a aplicação

```shell
npm run dev
```
