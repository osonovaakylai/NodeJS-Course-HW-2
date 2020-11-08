import { MOCK_USERS } from './../../mockData/user';
import request from 'supertest';
import app from '../../loaders/app';

const server = new app();

describe('User controller', () => {
  let token;
  let createdUsers = [];

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
        createdUsers = res.body.data
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

  it('should not get user by id', (done) => {
    request(server.httpServer)
      .get('/user/123')
      .set('x-access-token', token)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should create user', (done) => {
    const newUser = {
      login: 'user3',
      password: 'user3Pass',
      age: 18,
      isDeleted: false,
    };

    request(server.httpServer)
      .post('/user')
      .set('x-access-token', token)
      .send(newUser)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should update user', (done) => {
    request(server.httpServer)
      .put(`/user/${createdUsers[0]._id}`)
      .set('x-access-token', token)
      .send(MOCK_USERS[0])
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should response with error on updating not existing user', (done) => {
    request(server.httpServer)
      .put('/user/1234')
      .set('x-access-token', token)
      .send(MOCK_USERS[0])
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should delete user', (done) => {
    request(server.httpServer)
      .delete(`/user/${createdUsers[0]._id}`)
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should response with error on deleting not existing user', (done) => {
    request(server.httpServer)
      .delete('/user/123')
      .set('x-access-token', token)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
