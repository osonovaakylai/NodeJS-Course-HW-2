"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../loaders/app"));
const server = new app_1.default();
describe("User Group controller", () => {
    let token;
    let createdUsers = [];
    let createdGroups = [];
    beforeAll((done) => {
        const body = {
            login: "user1",
            password: "user1Pass",
        };
        supertest_1.default(server.httpServer)
            .post("/login")
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
    it("should get all users", (done) => {
        supertest_1.default(server.httpServer)
            .get("/users")
            .set("x-access-token", token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            createdUsers = res.body.data;
            done();
        });
    });
    it('should get groups', (done) => {
        supertest_1.default(server.httpServer)
            .get('/group')
            .set('x-access-token', token)
            .expect(200)
            .expect((res) => {
            res.body.auth = true;
        })
            .end((err, res) => {
            if (err)
                return done(err);
            createdGroups = res.body.data;
            done();
        });
    });
    it("should get groups by user id", (done) => {
        supertest_1.default(server.httpServer)
            .get(`/groups/${createdUsers[0]._id}/user`)
            .set("x-access-token", token)
            .expect(200)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it("should response with error if user id is not valid", (done) => {
        supertest_1.default(server.httpServer)
            .get("/groups/123/user")
            .set("x-access-token", token)
            .expect(500)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it("should get users by group id", (done) => {
        supertest_1.default(server.httpServer)
            .get(`/users/${createdGroups[0]._id}/group`)
            .set("x-access-token", token)
            .expect(200)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it("should response with error if group id is not valid", (done) => {
        supertest_1.default(server.httpServer)
            .get(`/users/${createdGroups[0]._id}/group`)
            .set("x-access-token", token)
            .expect(500)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
});
//# sourceMappingURL=user-group.test.js.map