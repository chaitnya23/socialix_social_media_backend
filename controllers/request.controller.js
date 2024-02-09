const User = require("../database/modules/User");

const request = {

  async make(req, res) {
    try {
      const { person_id, user_id } = req.body;
      console.log(req.body);

      const person = await User.findOne({
        _id:user_id,
      });

      const response = await User.updateOne(
        {
          _id: person_id,
        },
        {
          $addToSet: {
            Requests: person,
          },
        }
      );

      res.status(200).send({
        success:true,
        message:"request making complete"
      });
    } catch (error) {
      res.status(402).send(error.message);
    }
  },

  async getUserRequests(req, res) {
    try {

        const { id } = req.params;

        const user = await User.findOne({
            _id: id
        } ,{password:0}).populate(`Requests`);
       
        res.status(200).send(user.Requests);

    } catch (error) {

        res.status(403).send(error);
    }
},

  async accept(req, res) {
    try {
      const { user_id, person_id } = req.body;

      const friend = await User.findOne({
        _id: person_id,
      });
      const user = await User.findOne({
        _id:user_id
      })
      // console.log(friend);

      const response = await User.updateOne(
        {
          _id:user_id
        },
        {
              $pull: {
                Requests: friend._id,
              },
            
        }
      );

      const updateFriendList = await  User.updateOne({
        _id:user_id
      },{
        $addToSet:{
          friends:friend
        }
      })

      const updateFriendList2 = await  User.updateOne({
        _id:person_id
      },{
        $addToSet:{
          friends:user
        }
      })

      res.status(200).send(response);
    } catch (error) {
      res.status(402).status(error.message, "error in request accepting ");
    }
  },

  async deny(req, res) {
    try {

      const { user_id, person_id } = req.body;
      const person = await User.findOne({
        _id: person_id,
      });

      const status = await User.updateOne(
        {
          _id:user_id,
        },
        {
          $pull: {
            Requests: person._id,
          },
        }
      );

      res.status(200).send("request deny complete");
    } catch (error) {
      res.status(402).send(error.message, "error in denying request !!");
    }
  } ,

  async cancel(req, res) {
    try {

      const { user_id, person_id } = req.body;
      const user = await User.findOne({
        _id: user_id,
      });

      const status = await User.updateOne(
        {
          _id:person_id,
        },
        {
          $pull: {
            Requests: user._id,
          },
        }
      );

      res.status(200).send("request deny complete");
    } catch (error) {
      res.status(402).send(error.message, "error in denying request !!");
    }
  }

};

module.exports = request;
