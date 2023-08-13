const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config/.env" });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console.error, "Error in connecting to MongoDB")
);

db.once("open", function () {
  console.log("Connected to Database :: Mongodb");
});

exports.module = db;
