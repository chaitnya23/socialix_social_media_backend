const router = require('express').Router();
const request = require('../controllers/request.controller');
const verify = require('../middlewares/verify');



router.post('/make' ,request.make);
router.post('/cancel' ,request.cancel);
router.post('/accept' ,request.accept);
router.post('/deny' ,request.deny);
router.get('/get/:id',request.getUserRequests);

module.exports = router;