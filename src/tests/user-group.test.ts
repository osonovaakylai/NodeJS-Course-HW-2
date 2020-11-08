import request from 'supertest';

import app from '../loaders/app';

const server = new app();

describe('User Group controller', () => {
  let token;
  let createdUsers = [];
  let createdGroups = [];

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
        done();
      });
  });

  it('should get all users', (done) => {
    request(server.httpServer)
      .get('/users')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        createdUsers = res.body.data;
        done();
      });
  });

  it('should get groups', (done) => {
    request(server.httpServer)
      .get('/group')
      .set('x-access-token', token)
      .expect(200)
      .expect((res) => {
        res.body.auth = true;
      })
      .end((err, res) => {
        if (err) return done(err);
        createdGroups = res.body.data;
        done();
      });
  });

  it('should get groups by user id', (done) => {
    request(server.httpServer)
      .get(`/groups/${createdUsers[0]._id}/user`)
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should response with error if user id is not valid', (done) => {
    request(server.httpServer)
      .get('/groups/123/user')
      .set('x-access-token', token)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get users by group id', (done) => {
    request(server.httpServer)
      .get(`/users/${createdGroups[0]._id}/group`)
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should response with error if group id is not valid', (done) => {
    request(server.httpServer)
      .get('/users/1234/group')
      .set('x-access-token', token)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
