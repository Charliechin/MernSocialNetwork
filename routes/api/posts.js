const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
//
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/*
  @route  POST api/posts
  @desc   Create a post
  @access Private
 */
router.post('/', [
  auth,
  [check('text', 'Text is required')
    .not()
    .isEmpty()]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {

    // dont send the password back, giving us the user 
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);

  } catch (error) {
    res.send('Server Error');
  }
  // res.send('Posts route')
});

/*
  @route  GET api/posts
  @desc   Get all posts
  @access Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts)

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');

  }
})

/*
@route GET api/posts/:post_id
@desc  Get post by ID
@access Private
*/

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);


  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ msg: "Post not found" });
    res.status(500).send('Server Error')
  }

});


/*
@route DELETE api/posts/:post_id
@desc  Delete post by ID
@access Private
*/

router.delete('/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {

      return res.status(401).json({ msg: "Not Authorised" })

    }

    await post.deleteOne();
    res.json({ msg: "Post Removed" });


  } catch (error) {
    console.log(error.meesage);

  }



})


module.exports = router;