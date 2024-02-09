const User = require('../database/modules/User');
const getImgUrlFromCloudinary = require('../providers/img-url-provider');
const createToken = require('../providers/provideToken');

const auth = {

    async login(req, res) {

        const { userName, password } = req.body;
        try {

            const user = await User.findOne({
                userName,
                password
            }, { _id: 1, name: 1, userName: 1, profilePic: 1, friends: 1, Requests: 1 })
                .populate("friends Requests", {
                    name: 1,
                    _id: 1,
                    userName: 1,
                    profilePic: 1
                });

            if (!user) {
                throw new Error("user not found")
            }

            const token = await createToken(userName);
            res.cookie("socialix", token, {
                httpOnly: true
            })
            res.status(200).send({
                user, token
            });

        } catch (error) {

            console.log("error in login".error);
            res.status(402).send(error.message);
        }
    },

    async signup(req, res) {

        console.log(req.body);
        try {
            const { name, userName, password, imgUrl } = req.body;

            const created_user = await User.create({
                name,
                userName: userName,
                profilePic: imgUrl,
                password
            })

            const token = await createToken(userName);
            res.cookie("socialix", token, {
                httpOnly: true
            })

            res.status(200).send({ user: created_user, token });

        } catch (error) {
            console.log(error);

            res.status(402).send(error.message);
        }
    },

    async logout(req, res) {

        try {

            res.clearCookie("socialix");
            res.status(200).send("success logout...");

        } catch (error) {

            res.status(402).send("error in loging out the user");
        }

    },

    async getuser(req, res) {

        try {
            const user = req.rootUser;
            res.send(user);

        } catch (error) {

            res.status(402).send("error in getting user");
        }

    }
}

module.exports = auth;