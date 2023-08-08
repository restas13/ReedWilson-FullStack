const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// for updating a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affected] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (affected > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// For adding a post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({ ...body, userId: req.session.userId });
        console.log(newPost);
        res.json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
