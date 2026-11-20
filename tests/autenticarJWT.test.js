
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Backend: Middleware autenticarJWT', () => {
  const SECRET = 'senha_jwt_de_teste';

  beforeAll(() => { process.env.SECRET_JWT = SECRET; });

  it('Deve permitir acesso com token válido', async () => {
    const token = jwt.sign(
      { id: 1, email: 'teste@email.com' }, SECRET
    );

    const response = await request(app)
      .get('/musicas')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Deve bloquear acesso com token inválido', async () => {
    const response = await request(app)
      .get('/musicas')
      .set('Authorization', 'Bearer exemplo_de_token_inválido');

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Token inválido.');
  });
});
