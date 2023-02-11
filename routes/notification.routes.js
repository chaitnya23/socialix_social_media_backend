const router = require('express').Router();
const verify = require('../middlewares/verify');
const notification = require('../controllers/notification.controller');


router.get('/get/:id' ,notification.get);

router.post('/create' ,notification.create);



module.exports = router;