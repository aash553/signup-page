const { signup,login } = require('../Controllers/AuthController');
const { signvalidation, loginvalidation } = require('../Middlewares/AuthValidation');

const router  = require('express').Router();

router.post('/login',loginvalidation,login);
router.post('/signup',signvalidation,signup);

module.exports= router