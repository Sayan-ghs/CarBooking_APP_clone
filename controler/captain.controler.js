const { json } = require('express')
const captainModel =  require('../models/captain.model')
const Captainservice = require('../services/captain.service')
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')
const cookie = require('cookie-parser')

module.exports.registerCaptain = async (req,res,next)=>{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return res.status(400).json({errors : errors.array()})
        }

        const {fullname , email , password , vehicle }=req.body

        const isCaptainAlreadyExist = await captainModel.findOne({email})
        if(isCaptainAlreadyExist){
                return res.status(400).json({
                        message : 'captain clready exist'
                })
        }

        const hashedpassword = await captainModel.hashPassword(password)

        const captain = await Captainservice.creatCaptain({
                firstname : fullname.firstname,
                lastname : fullname.lastname,
                email,
                password : hashedpassword,
                color : vehicle.color,
                plate : vehicle.plate,
                capacity : vehicle.capacity,
                vehicleType : vehicle.vehicleType
        })
        const token = captain.generateAuthToken()

        res.status(201).json({
                token,
                captain
        })
}

module.exports.loginCaptain = async (req,res,next) =>{
        const error = validationResult(req)
        if(!error.isEmpty()){
                return res.status(400).json({
                        errors : error.array()
                })
        }

        const {email,password}=req.body
        const captain = await captainModel.findOne({email}).select('+password')
        if(!captain){
                res.status(401).json({message : "Invalid email or password"})
        }

        const isMatch = await captain.comparePassword(password)

        if(!isMatch){
                return res.status(401),json({
                        message:"Invalid email or password"
                })
        }

        const token = captain.generateAuthToken()

        res.cookie('token',token)

        res.status(200).json({
                token,
                captain
        })
}

module.exports.getCaptainProfile = async(req,res,next)=>{
        res.status(200).json({
                captain : req.captain
        })
}

module.exports.logoutCaptain = async (req,res,next) =>{
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

        await blacklistTokenModel.create({token})
        res.clearCookie('token')
        res.status(200).json({
                message : 'logout succesfully'
        })
}
