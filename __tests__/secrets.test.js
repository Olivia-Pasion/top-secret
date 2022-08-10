const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const testUser = {
  firstName: 'jane',
  lastName: 'Doe',
  email: 'abc@123.com',
  password: 'abc123'
};

const testSecret = {
  title: 'hello',
  description: 'hey hi hello',
};

const registerAndLogin = async (userProps = {})  => {
  const password = userProps.password ?? testUser.password;

  const agent = request.agent(app);
  
  const user = await UserService.create({ ...testUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  //console.log({ user });
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/secrets should show secrets if authenticated', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(200);
  });
  it('#POST /secrets, users can post secrets', async () => {
    const res = await request(app).post('/api/v1/secrets').send(testSecret);
    const { title, description, created_at } = testSecret;

    expect(res.body).toEqual({
      id: expect.any(String),
      title,
      description,
      created_at,
    });
  });

  afterAll(() => {
    pool.end();
  });
});



