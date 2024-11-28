const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../helpers/db");
const User = db.User;

// this will authenticate the user Credential
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    console.log("user model", user);
    // if user is truthy then sign the token 
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.secret, {
            expiresIn: "1h",
        });
        console.log("user.toJson,...user.toJSON");
        return { ...user.toJSON(), token };
    }

    // retriving all users
    async function getAll() {
        return await User.find();
    }

    //retriving user from user id 
    async function getById(id) {
        return User.findById(id);
    }
    //adding user to db
    async function create(userParam) {
        const user = await User.findOne({ email: userParam.email });
        //validate
        if (user) throw `this mail already exists :${userParam.email}`;

        //create user object
        const newUser = new User(userParam);
        if (userParam.password) {
            newUser.password = bcrypt.hashSync(userParam.password, 10);
        }
        await newUser.save();
    }

    async function update(id, userParam) {
        console.log(id, userParam);
        const user = await User.findById(id);
        console.log(user.email, userParam.email);
        //validate the id and email
        if (!user) throw "User Not Found";
        if (
            user.email !== userParam &&
            (await User.findOne({ email: userParam.email }))
        ) {
            throw "Email already exists";
        }

        //convert the password to hash 
        if (userPram.password) {
            userParam.password = bcrypt.hashSync(userPram.password, 10);
        }

        //copy the user obj 
        Object.assign(user, userParam);
        await user.save();
    }

    async function _delete(id) {
        await User.findByIdAndRemove(id);
    }
}

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
