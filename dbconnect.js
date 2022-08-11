const mongoose = require("mongoose");

const dbString = "mongodb+srv://Aaryaman01:gta5rocks@cluster0.ctcisb5.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(dbString, {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(`Can't be connected ${err}`));

  module.exports = mongoose