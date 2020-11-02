import request from "supertest";
import app from "../../loaders/app";
import testHelpers from "../helpers/utils";

const server = new app();

describe("Login", () => {
  it("check login", async (done) => {
    const body = {
      login: "user1",
      password: "user1Pass",
    };
    request(server.httpServer)
      .post("/login")
      .send(body)
      .expect(200)
      .expect((res) => {
        res.body.auth = true;
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

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
    it("should check API", async (done) => {
      request(server.httpServer)
        .post("/")
        .send()
        .expect(200)
        .expect((res) => {
          res.body = "API works";
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  //   afterAll(done => {
  //     server.db.close();
  //     done();
  //     });
});
