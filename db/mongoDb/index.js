const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;
const mongoDbName = process.env.MONGO_DB_NAME;

const connectToDb = async () => {
  await mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: mongoDbName,
  });
};

module.exports = connectToDb;
