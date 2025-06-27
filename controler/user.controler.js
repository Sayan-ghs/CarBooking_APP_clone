const { validationResult } = require("express-validator")
const userModel = require("../models/user.model")
const userService = require('../services/user.service')


module.exports.registerUser = async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return res.send(400).json({
                        errors : errors.array()
                })
        }

        console.log(req.body)

        const {fullname, email , password }=req.body

        const hashedpassword = await userModel.hashPassword(password)

        const user =  await userService.creatUser({
        fullname : {
                 firstname : fullname.firstname,
                 lastname : fullname.lastname
        },
                email,
                password : hashedpassword
        })

        const token = user.generateAuthToken()

        res.send(201).json({user,token})
        
}

module.exports.loginUser = async (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return res.send(400).json({
                        errors : errors.array()
                })
        }

        const {email,password}=req.body

        const user = await userModel.findOne({email}).select('+password')

        if(!user){
                return res.status(401).json({message:'Invalid email and password'})
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
                return res.status(401).json({
                        message : 'Invalid password and email '
                })
        }

        const token = user.generateAuthToken();

        res.cookie('token',token)

        res.status(201).json({
                token,
                user
        })
}

module.exports.getUserprofile = async(req,res,next)=>{
        res.status(200).json(req.user)
        console.log(req.user)
}