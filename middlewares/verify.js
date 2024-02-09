const jwt = require('jsonwebtoken');
const User = require('../database/modules/User');


const verify = async (req, res, next) => {

    try {

        const {token} = req.params;
        if (!token) {
            // throw new Error("token wont exists!!");
            res.status(401).send("token not found");
            return;
        }

        const verifyToken = jwt.verify(token, "chaitnyagiriprojectsocialix2306@jwtkey");

        const rootUser = await User.findOne({ userName: verifyToken.userName }, { password:0 })
            .populate("friends Requests SavedPosts");

        if (!rootUser) {
            throw new Error("authentication problem .....");
        }

        req.rootUser = rootUser;
        req.token = token;

        next();


    } catch (error) {
        // console.log(error.message);
        res.status(404).send("error to authenticate...");
    }
}

module.exports = verify;