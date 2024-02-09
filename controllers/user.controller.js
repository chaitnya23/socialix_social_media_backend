// const { loginUser } = require('../../client/src/apis');
const User = require('../database/modules/User');


const user = {

    async getAllUsers(req, res) {

        const { id } = req.params;

        try {

            const users = await User.find({ _id: { $not: { $eq: id } } }, { name: 1, profilePic: 1, userName: 1, friends: 1, _id: 1, Requests: 1 })
                .populate("friends Requests", { name: 1, userName: 1, friends: 1, _id: 1, profilePic: 1 });

            res.status(200).send(users);

        } catch (error) {

            res.status(402).json({
                message: error.message,
                success: "failed"
            })
        }
    },



    async get(req, res) {
        try {

            const { id } = req.params;

            const user = await User.findOne({
                _id: id
            }, { password: 0 }).populate(`friends Requests Posts SavedPosts`);
            res.status(200).send(user);

        } catch (error) {
            res.status(403).send(error);
        }
    },

    async getNewPeople(req, res) {

        const { id } = req.params;

        try {

            const users = await User.find({
                $and: [{ friends: { $ne: id } }, { _id: { $ne: id } }]
            }, { password: 0 });


            res.status(200).send(users);

        } catch (error) {
            res.status(403).send(error);
        }
    },



    async getByName(req, res) {

        try {
            const { name } = req.params;

            const users = await User.find({
                $or: [

                    {
                        name: {
                            $regex: new RegExp(name)
                        }
                    },
                    {
                        userName: {
                            $regex: new RegExp(name)
                        }
                    }
                ]
            });

            res.status(200).send(users);



        } catch (error) {

            console.log(error.message);
            console.log(error.message, "at get by name");
            res.status(400).send(error.message);
        }
    },

    async unfriend(req, res) {

        try {
            const { user_id, friend_id } = req.body;
            const updateUser = await User.updateOne({ _id: user_id }, {
                $pull: {
                    friends: friend_id
                }
            })

            const updateFriend = await User.updateOne({ _id: friend_id }, {
                $pull: {
                    friends: user_id
                }
            });

            res.status(200).send("updated friend list");

        } catch (error) {

            res.status(402).send("error in unfriending");
        }
    }





}

module.exports = user;