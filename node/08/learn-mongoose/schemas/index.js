const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:27017/admin`,
    {
      dbName: "nodejs",
      useNewUrlParser: true,
      // useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log("Error!!");
      } else {
        console.log("Success!!");
      }
    }
  );
};
mongoose.connection.on("error", (err) => {
  console.error("connection error", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("connection down!! retry connection");
  connect();
});

module.exports = connect;
