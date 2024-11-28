const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

const Role = require("../helpers/roles");
const jwt = require("../helpers/jwt");

//Routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", jwt(Role, Admin), getAll);
router.get("/current", jwt(), getCurrent);
router.get("/:id", update);
router.put("/:id", _delete);

module.exports = router;

//router functions

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            console.log(user);
            user
                ? res.json({ user: user, message: "User Logged in Successfully" })
                : res.status(401).json({ message: "Invalid Credentials" });

        })
        .catch((err) => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then((user) => {
            res.json(
                {
                    user: user,
                    message: `User Registered Successfully ${req.body.email}`,
                }
            )
                .catch((err) => next(err));
        })

}

function getAll(req, res, next) {
    const currentUser = req.user;
    if (currentUser.role !== Role.Admin) {
        return res.status(403).json({ message: "Access Denied" });
    }
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function getCurrent(req, res, next) {
    console.log(req);
    userService.
        getById(req.user.sub)
        .then((user) => (user ? res.json(user) : res.status(404)))
        .catch((err) => next(err));
}

function getById(req, res, next) {
    userService.
        getById(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(400).json({ message: "User Not Found" });
                next();
            }
            return res.json(user);
        })
        .catch((err) => next(err));
}

function update(req, res, next) {
    userService
        .update(req.params.id, req.body)
        .then(() =>
            res.json({
                message: `User with id: ${req.params.id} updated successfully.`,
            })
        )
        .catch((error) => next(error));
}

function _delete(req, res, next) {
    userService.
        delete(req.params.id)
        .then(() =>
            res.json({
                message: `User with id: ${req.params.id} deleted successfully.`,
            })
        )
        .catch((err) => next(err));
}