"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../../mockData/user");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../loaders/app"));
const server = new app_1.default();
describe('User controller', () => {
    let token;
    let createdUsers = [];
    beforeAll((done) => {
        const body = {
            login: 'user1',
            password: 'user1Pass',
        };
        supertest_1.default(server.httpServer)
            .post('/login')
            .send(body)
            .expect(200)
            .expect((res) => {
            res.body.auth = true;
        })
            .end((err, res) => {
            if (err)
                return done(err);
            token = res.body.token;
            done();
        });
    });
    it('should get all users', (done) => {
        supertest_1.default(server.httpServer)
            .get('/users')
            .set('x-access-token', token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            createdUsers = res.body.data;
            console.log(createdUsers);
            done();
        });
    });
    it('should get all users by params', (done) => {
        supertest_1.default(server.httpServer)
            .get('/users')
            .set('x-access-token', token)
            .query({ loginSubstring: 'er', limit: 3 })
            .expect(200)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('should not get user by id', (done) => {
        supertest_1.default(server.httpServer)
            .get('/user/123')
            .set('x-access-token', token)
            .expect(500)
            .end((err) => {
            if (err)
                return done(err);
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
        supertest_1.default(server.httpServer)
            .post('/user')
            .set('x-access-token', token)
            .send(newUser)
            .expect(200)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('should not update user', (done) => {
        supertest_1.default(server.httpServer)
            .put('/user/123')
            .set('x-access-token', token)
            .send(user_1.MOCK_USERS[0])
            .expect(500)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('should not delete user', (done) => {
        supertest_1.default(server.httpServer)
            .delete('/user/123')
            .set('x-access-token', token)
            .expect(500)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
});
//# sourceMappingURL=user.test.js.map