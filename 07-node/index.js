const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

require("./server");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
