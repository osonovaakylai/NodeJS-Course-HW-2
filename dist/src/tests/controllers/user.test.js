"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../loaders/app"));
const database_1 = require("../../loaders/database");
const server = new app_1.default();
// describe("Login", () => {
//   it("check login", async (done) => {
//     const body = {
//       login: "user1",
//       password: "user1Pass",
//     };
//     request(server.httpServer)
//       .post("/login")
//       .send(body)
//       .expect(200)
//       .expect((res) => {
//         res.body.auth = true;
//       })
//       .end((err, res) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
describe("User", () => {
    let token;
    //   beforeAll((done) => {
    //     const body = {
    //       login: "user1",
    //       password: "user1Pass",
    //     };
    //     request(server.httpServer)
    //       .post("/login")
    //       .send(body)
    //       .expect(200)
    //       .expect((res) => {
    //         res.body.auth = true;
    //       })
    //       .end((err, res) => {
    //         if (err) return done(err);
    //         token = res.body.token;
    //         console.log(res);
    //         done();
    //       });
    //   });
    describe("/", () => {
        let token;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.sequelize.sync({ force: true });
        }));
        // it("should check API", async (done) => {
        //   request(server.httpServer)
        //     .post("/")
        //     .send()
        //     .expect(200)
        //     .expect((res) => {
        //       res.body = "API works";
        //     })
        //     .end((err, res) => {
        //       if (err) return done(err);
        //       done();
        //     });
        // });
    });
    it("check login", (done) => __awaiter(void 0, void 0, void 0, function* () {
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
            done();
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.sequelize.close();
    }));
});
//# sourceMappingURL=user.test.js.map