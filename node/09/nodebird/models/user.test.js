const Sequelize = require("sequelize");
const User = require("./user");
const config = require("../config/config")["test"];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

describe("User Model", () => {
  test("static init", () => {
    expect(User.init(sequelize)).toBe(User);
  });
  test("associate", () => {
    const db = {
      User: {
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
      },
      Post: {},
    };
    User.associate(db);
    expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
    expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
  });
});
