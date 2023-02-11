const User = require('../database/modules/User');
const Notification = require('../database/modules/Notification')


const notification = {
    
    async get(req ,res){

        const {id} = req.params;
        
        try {
            const data = await User.findById(id).select({notifications:1}).populate([{
                path:"notifications",
                populate:"creater receiver post"
            }]).sort({"createdAt":1})
            
            res.status(200).send(data.notifications);
            
        } catch (error) {
            res.status(402).send(error);
            
        }
    },
    async create(req ,res){
        const {creater ,receiver ,content ,post} = req.body;

        try {
            
            const notification = await Notification.create({
                creater,receiver,content,post
            })

            await User.updateOne({_id:receiver} ,{$push:{notifications:notification._id}});

            res.status(200).send("notification created");

        } catch (error) {
            res.status(402).send(error);
        }
    }
}

module.exports = notification;