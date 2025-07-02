const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const captainControler = require('../controler/captain.controler')
const authmiddlewire = require('../middlewire/auth.middlewire')

router.post('/register',[
        body('email').isEmail().withMessage('Invalid email'),
        body('fullname.firstname').isLength({min : 3}).withMessage('first name must be at least 3'),
        body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),
        body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters'),
        body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters'),
        body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
        body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid')
],
captainControler.registerCaptain
)

router.post('/login',[
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min : 6}).withMessage('password is not valid')
],
captainControler.loginCaptain
)

router.get('/profile',authmiddlewire.authCaptain,captainControler.getCaptainProfile)

router.get('/logout',authmiddlewire.authCaptain,captainControler.logoutCaptain)




module.exports = router