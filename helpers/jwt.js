const expressJwt = require("express-jwt");
require("dotenv").config();
const db = require("../helpers/db");

function jwt(roles = []) {
    if (typeof roles === "string") {
        roles = [roles];
        console.log(roles);
    }
    const secret = process.env.secret;
    return [
        expressJwt({ secret, algorithms: ["HS256"] }),
        async (req, res, next) => {
            const user = await db.user.findById(req.user.sub);
            if (!user || (roles.length && !roles.includes(suer.role))) {
                return res.status(401).json({ message: "Only admin is Authorized" });
            }

            req.user.role = user.role;
            next();
        },
    ];
}

module.exports = jwt;