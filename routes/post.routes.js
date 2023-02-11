const router = require('express').Router();
const verify = require('../middlewares/verify');
const post = require('../controllers/post.controller');


router.get('/get' ,post.get);
router.get('/:id' ,post.getById);

router.delete('/delete/:id' ,post.delete);

router.post('/create' ,post.create);
router.post('/add/like' ,post.addLike);
router.post('/add/comment' ,post.addComment);
router.post('/dislike' ,post.removeLike);
router.post('/save' ,post.savePost);


module.exports = router;