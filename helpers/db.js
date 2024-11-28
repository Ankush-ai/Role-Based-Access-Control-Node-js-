require("dotenv").config();
const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => console.log(`Connected to Database Sucessfully`));
}
catch (err) {
    console.log(err);
    console.log(`MongoDB Error`, error.message);
    process.exit(1);
}

mongoose.Promise = global.Promise;

module.exports = {
    User: require("../models/user"),
    db
};
