const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    MONGO_URL,
    {
      dbName: "gifchat",
      useNewUrlParser: true,
    },
    (err) => {
      if (err) console.error("db connection error", err);
      else console.log("db connected");
    }
  );
};

mongoose.connection.on("error", (err) => {
  console.error("mongodb connection error", err);
});

mongoose.connection.on("disconnected", () => {
  console.error("db connection refused. reconnect");
  connect();
});

module.exports = connect;
