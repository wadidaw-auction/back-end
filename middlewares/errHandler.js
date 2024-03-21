const errHandler = (err, req, res, next) => {
    // console.log(err);
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message : "Email must be"})
        case "SequelizeValidationError":
            res.status(400).json({ message: err.errors[0].message });
            break;
        case "EmailIsEmpty":
            res.status(400).json({ message: "Email cannot be Empty" });
            break;

        case "PasswordIsEmpty":
            res.status(400).json({ message: "Password cannot be Empty" });
            break;

        case "InvalidLogin":
            res.status(401).json({ message: "Invalid Email/Password" });
            break;

        case "InvalidToken":
            res.status(401).json({ message: "Invalid Token" });
            break;

        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid Token" });
            break;

        case "Forbidden":
            res.status(403).json({ message: "Forbidden" });
            break;

        case "NotFound":
            res.status(404).json({ message: "Data Not Found" });
            break;

        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }
};

module.exports = errHandler;
