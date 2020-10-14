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

/*
  @route  PUT api/posts/like/:post_id
  @desc   Like a post
  @access Private
 */

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check if the post has already been liked 
    const currentUserId = req.user.id;
    const filterLikes = post.likes.filter(like => like.user.toString() === currentUserId.toString());
    const alreadyLiked = filterLikes.length > 0 ? true : false;


    if (alreadyLiked) {
      return res.status(400).json({ msg: "Already liked" });
    }

    post.likes.unshift({ user: currentUserId });
    await post.save();
    return res.json(post.likes);

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ msg: 'Server error' });

  }
})

/*
  @route  PUT api/posts/unlike/:post_id
  @desc   Unlike a post
  @access Private
 */
router.put('/unlike/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);
    const currentUserId = req.user.id;

    const filterLikes = post.likes.filter(like => like.user.toString() === currentUserId.toString());
    const isLiked = filterLikes.length > 0 ? true : false;

    if (isLiked) {
      // The user likes this and wants to 'unlike' 
      // returns an array of filtered likes that does not matches with the current user
      const unLikePost = post.likes.filter(like => like.user.toString() !== currentUserId); // will return ['A', 'C']

      post.likes = unLikePost;
      await post.save();
      return res.json(post);
    }

    return res.status(400).json({ msg: "Post has not yet been liked" })



  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ msg: 'Server Error' });
  }

})


/*
  @route  POST api/posts/comment/:post_id
  @desc   Create a comment
  @access Private
 */

router.post('/comment/:post_id', [auth, [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erorrs: errors.array() })
  }

  try {
    const currentUserId = req.user.id;
    const user = (await User.findById(currentUserId)).isSelected('-password');
    const post = await Post.findById(req.params.post_id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: currentUserId
    };

    post.comments.unshift(newComment);
    await post.save();

    // const ojete = await newComment.save();
    console.log("post: ", post);
    return res.json(post);


  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ msg: 'Server Error, miarma' });
  }
})

/*
  @route  DELETE api/posts/comment/:post_id/:comment_id
  @desc   Delete a comment
  @access Private
 */
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)
    debugger
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    return res.json(post.comments);


  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');

  }
})



module.exports = router;