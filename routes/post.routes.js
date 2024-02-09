const router = require('express').Router();
const verify = require('../middlewares/verify');
const post = require('../controllers/post.controller');


router.get('/get' ,post.get);
router.get('/:id' ,post.getById);
router.get('/get/popular',post.getPopularPosts);

router.delete('/delete/:id' ,post.delete);

router.post('/create' ,post.create);
router.post('/like' ,post.addLike);
router.post('/add/comment' ,post.addComment);
router.get('/get/comments/:post_id' ,post.getComments);

router.post('/dislike' ,post.removeLike);
router.post('/save' ,post.savePost);
router.post('/unsave' ,post.unsavePost);



module.exports = router;