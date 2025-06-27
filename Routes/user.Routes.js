const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userControler =  require("../controler/user.controler")
const authmiddlewire = require('../middlewire/auth.middlewire')

// validation
router.post('/register',[
        body('email').isEmail().withMessage('Invalid email'),
        body('fullname.firstname').isLength({ min : 3}).withMessage('First name must be at least 3 character long'),
        body('password').isLength({min : 6}).withMessage('password must be atleast 6 character long')
],
userControler.registerUser
)

router.post('/login',[
        body('email').isEmail().withMessage('Invalid Message'),
        body('password').isLength({min:6}).withMessage('password is incorrect')
],
userControler.loginUser
)

router.get('/profile',authmiddlewire.authUser,userControler.getUserprofile)



module.exports=router