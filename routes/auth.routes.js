const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const verify = require('../middlewares/verify');

router.get('/get/:token' ,verify ,auth.getuser)
router.get('/logout' ,auth.logout);

router.post('/login' ,auth.login);
router.post('/signup' ,auth.signup);

module.exports = router;
