const request = require("supertest");
const app = require("../app");

describe('Frontend: POST /register', () => {
  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'teste@email.com', password: 'senha123' });
    expect(res.status).toBe(201);
  });

  it('não deve registrar um usuário com um email existente', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'teste@email.com', password: 'senha123' });

    const res = await request(app)
      .post('/register')
      .send({ email: 'teste@email.com', password: 'senha123' });
    expect(res.status).toBe(400);
  });
});