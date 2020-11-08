import request from 'supertest';
import app from '../../loaders/app';

const server = new app();

describe('User controller', () => {
  let token;
  beforeAll((done) => {
    const body = {
      login: 'user1',
      password: 'user1Pass',
    };
    request(server.httpServer)
      .post('/login')
      .send(body)
      .expect(200)
      .expect((res) => {
        res.body.auth = true;
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        console.log(res);
        done();
      });
  });

  it('should get all users', (done) => {
    request(server.httpServer)
      .get('/users')
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get all users by params', (done) => {
    request(server.httpServer)
      .get('/users')
      .set('x-access-token', token)
      .query({ loginSubstring: 'er', limit: 3 })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
