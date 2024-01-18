const User = require('../models/user');
const express = require('express');
const exValidator = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', 
    [
        exValidator.body('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          .normalizeEmail(),  //sanitizer

          exValidator.body(
            'password',
            'Please enter a password with only numbers and text and at least 3 characters.'
          )
            .isLength({ min: 3 })
            .isAlphanumeric()
            .trim(),  //s
            
    ],

    authController.postLogin
);

//isEmail checks for field named email in body, query params, headers, cookies and finds and validates it.
//withmessage works on just previously used validator
// .isLength({ min: 5 })
//     .withMessage('must be at least 5 chars long')
//     .matches(/\d/)
//     .withMessage('must contain a number'),
router.post('/signup',
    [
      exValidator.check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          // async validation
          return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'E-Mail exists already, please pick a different one.'
              );
            }
            return true;
          });
        })
        .normalizeEmail(), //s

      exValidator.body(
        'password',
        'Please enter a password with only numbers and text and at least 3 characters.'
      )
        .isLength({ min: 3 })
        .isAlphanumeric()
        .trim(), //s

      exValidator.body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
            }
            return true;
        })
        .trim() //s
    ],

    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
