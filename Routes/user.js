const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { handleUserSignUp,handleUserLogIn } = require('../controller/user');

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',handleUserLogIn );

router.post('/signup', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],handleUserSignUp);


module.exports = router;    