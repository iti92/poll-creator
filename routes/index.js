const express = require('express');
const router = express.Router();
const Page = require('../models/page')
const Question = require('../models/questionBlock')
const Pool = require('../models/pool');


const { sessionChecker } = require('../middleware/auth');
const User = require('../models/user');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const pages = await Page.find()
  const pool = await Pool.find()
  console.log(pool);
  
  res.render('index', { title: 'Медицинский опрос', pages, pool});
});

router.get('/create', async function(req, res, next) {
  const documents = await Page.find();
  res.render('create', {documents});
});


router.route('/register')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save();
      req.session.user = user;
      res.redirect('/');
    }
    catch (error) {
      res.redirect('/entries/register');
    };
  });


// route for user Login
router.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('/entries/login');
  })
  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });
    if (!user) {
      res.redirect('/login');
      // } else if (!user.validPassword(password)) {
    } else if (user.password !== password) {
      res.redirect('/entries/login');
    } else {
      req.session.user = user;
      res.redirect('/');
    }

  });


// // route for user's dashboard
// router.get('/dashboard', (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.render('dashboard');
//   } else {
//     res.redirect('/login');
//   }
// });


// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
