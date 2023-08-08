const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = PostData.map((post) => {
            post.get({ plain: true });
        });

        res.render('allPosts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id, {
            include: User,
        });

        if (postData) {
            const post = data.get({ plain: true });

            res.render('individualPost', ( post ));
        }else {
            res.status(404).end()
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/signin', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  

  
  module.exports = router;
  