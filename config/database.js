const mongoose = require("mongoose");

mongoose.set("runValidators", true); //https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update contribution by Muho

mongoose.connect(process.env.DATABASE_URL);

// shortcut var to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
