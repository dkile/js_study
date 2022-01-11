const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await sequelize.sync();
});

describe("POST /join", () => {
  test("join", (done) => {
    request(app)
      .post("/auth/join")
      .send({
        email: "zerocho@gmail.com",
        nick: "zerocho",
        password: "nodejsbook",
      })
      .expect("Location", "/")
      .expect(302, done);
  });
});

describe("POST /join", () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "nodejsbook",
      })
      .end(done);
  });
  test("Already logged in, then redirect to /", (done) => {
    const message = encodeURIComponent("Logged in");
    agent
      .post("/auth/join")
      .send({
        email: "zerocho@gmail.com",
        nick: "zerocho",
        password: "nodejsbook",
      })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });
});

describe("POST /login", () => {
  test("unregistered user", (done) => {
    const message = encodeURIComponent("not a memeber");
    request(app)
      .post("/auth/login")
      .send({
        email: "zerocho1@gmail.com",
        password: "nodejsbook",
      })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });

  test("LogIn executed", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "nodejsbook",
      })
      .expect("Location", "/")
      .expect(302, done);
  });

  test("incorrect password", (done) => {
    const message = encodeURIComponent("incorrect password");
    request(app)
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "1234",
      })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });
});

describe("GET /logout", () => {
  test("not logged in", (done) => {
    request(app).get("/auth/logout").expect(403, done);
  });

  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "nodejsbook",
      })
      .end(done);
  });

  test("logout executed", (done) => {
    agent.get("/auth/logout").expect("Location", "/").expect(302, done);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
