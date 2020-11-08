import request from 'supertest';

import app from '../loaders/app';

const server = new app();

describe('/', () => {
  it('should check API', async (done) => {
    request(server.httpServer)
      .post('/')
      .send()
      .expect(200)
      .expect((res) => {
        res.body = 'API works';
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should login', async (done) => {
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
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should not login', async (done) => {
    const body = {
      login: 'asdf',
      password: 'asdfsdf',
    };
    request(server.httpServer)
      .post('/login')
      .send(body)
      .expect(404)
      .expect((res) => {
        res.body.auth = true;
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('check logout', async (done) => {
    request(server.httpServer)
      .get('/logout')
      .send()
      .expect(200)
      .expect((res) => {
        res.body.auth = false;
        res.body.token = null;
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
