const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const config = require('config');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get Token
// @access  Public

router.post('/', [
  check('email', 'please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // 400, if bad request 
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      //  See if user Exists
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtToken'),
        {
          expiresIn: 320000
        }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });

    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');

    }
  });



module.exports = router;