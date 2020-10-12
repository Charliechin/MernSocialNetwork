const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

/*
  @route  POST api/users
  @desc   Register user
  @access Public
 */
router.post('/', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'please enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more chars').isLength({ min: 6 })
],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // 400, if bad request 
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      //  See if user Exists
      let user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtToken'),
        {
          expiresIn: 360000
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