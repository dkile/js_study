jest.mock("../models/user");
const User = require("../models/user");
const { addFollowing } = require("./user");

describe("addFollowing", () => {
  const req = {
    user: { id: 1 },
    params: { id: 1 },
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test("Find user, add following, and respond success", async () => {
    User.findOne.mockReturnValue(
      Promise.resolve({
        addFollowing(id) {
          return Promise.resolve(true);
        },
      })
    );
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith("success");
  });

  test("If not found, respond status code 404, and call send(no user)", async () => {
    User.findOne.mockReturnValue(null);
    await addFollowing(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("no user");
  });

  test("If db error, call next(error)", async () => {
    const err = "error for test";
    User.findOne.mockReturnValue(Promise.reject(err));
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
