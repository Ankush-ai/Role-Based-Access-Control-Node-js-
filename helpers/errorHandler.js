function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.status(400).send({ message: err });

        //return custom message application erorr
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === "UnauthorizedError") {
        //jwt auth error
        return res.status(401).json({ message: "Invalid token" });
    }

    //default to 500 server error 
    return res.status(500).json({ message: err.message });
}

module.exports = { errorHandler }