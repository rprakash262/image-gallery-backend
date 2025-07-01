const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const app = require("./app");

const connectToDb = require("./db/mongoDb");

const port = process.env.PORT || 5000;

connectToDb()
  .then(() => {
    console.log("Database Connection Successful");
    app.listen(port, function () {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error: ", error);
  });
