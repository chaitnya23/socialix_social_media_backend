const router = require('express').Router();
const user_router = require('./user.routes');
const post_router = require('./post.routes');
const auth_router = require('./auth.routes');
const request_router = require('./request.routes');
const notification_router = require('./notification.routes');

router.get('/' ,(req,res)=>{

    
    res.json({
        api:"success",
        application:"socialix",
        author:"chaitnya 23",
        version:"1.0.0.0"
    })
})


// using diffrent routers
router.use('/api/user' ,user_router);
router.use('/api/auth' ,auth_router);
router.use('/api/post' ,post_router);
router.use('/api/request' ,request_router);
router.use('/api/notification' ,notification_router);




module.exports = router;