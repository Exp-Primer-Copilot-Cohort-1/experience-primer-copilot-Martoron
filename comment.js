// Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

//Create comment
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {id: req.body.postId}
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            commenter: req.user.id,
            comment: req.body.comment,
            postId: req.body.postId,
        });
        const fullComment = await Comment.findOne({
            where: {id: comment.id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
            }],
        });
        res.status(201).json(fullComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//Read comments
router.get('/:id', async(req, res, next) => {
    try {
        const comments = await Comment.findAll({
            where: {
                postId: req.params.id,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: User,
                attributes: ['id', 'nick'],
            }],
        });
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//Update comment
router.patch('/:id', isLoggedIn, async(req, res, next) => {
    try {
        const result = await Comment.update({
            comment: req.body.comment,
        }, {
            where: {id: req.params.id},
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//Delete comment
router.delete('/:id', isLoggedIn, async(req, res, next) => {
    try {
        const result = await Comment.destroy({
            where: {id: req.params.id},
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;