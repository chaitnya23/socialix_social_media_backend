const router = require('express').Router();
const user = require('../controllers/user.controller');

router.get('/:id' ,user.get);
router.get('/search/:name' , user.getByName);
router.get('/get/all/:id' ,user.getAllUsers);
router.get('/get/new/people/:id' ,user.getNewPeople);


router.post('/unfriend' ,user.unfriend);


module.exports = router;