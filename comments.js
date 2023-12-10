// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import models
const Comment = require('../models/Comment');

// @route   GET api/comments
// @desc    Get all comments
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get all comments
    const comments = await Comment.find();

    // Send comments
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/comments
// @desc    Add new comment
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('comment', 'Please enter a comment').not().isEmpty(),
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send error message
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const { name, email, comment } = req.body;

    try {
      // Create new comment
      const newComment = new Comment({
        name,
        email,
        comment,
      });

      // Save comment
      const comment = await newComment.save();

      // Send comment
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Export router
module.exports = router;