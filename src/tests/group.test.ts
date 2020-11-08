import { MOCK_GROUPS } from '../mockData/group';
import request from 'supertest';
import app from '../loaders/app';

const server = new app();

describe('Group controller', () => {
  let token;
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

  it('should handle token not provided case', (done) => {
    request(server.httpServer)
      .get('/group')
      .set('x-access-token', null)
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should create new group', (done) => {
    const newGroup = {
      name: 'group123',
      permissions: ['READ'],
    };
    request(server.httpServer)
      .post('/group')
      .set('x-access-token', token)
      .send(newGroup)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get group by id', (done) => {
    request(server.httpServer)
      .get(`/group/${createdGroups[0]._id}`)
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get error if there is no group with such id', (done) => {
    request(server.httpServer)
      .put(`/group/123`)
      .set('x-access-token', token)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should update group by id', (done) => {
    request(server.httpServer)
      .put(`/group/${createdGroups[0]._id}`)
      .set('x-access-token', token)
      .send(MOCK_GROUPS[0])
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should delete group', (done) => {
    request(server.httpServer)
      .delete(`/group/${createdGroups[0]._id}`)
      .set('x-access-token', token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should should response with error on deleting not existing group', (done) => {
    request(server.httpServer)
      .delete('/group/123')
      .set('x-access-token', token)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
