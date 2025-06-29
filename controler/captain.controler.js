const captainModel =  require('../models/captain.model')
const Captainservice = require('../services/captain.service')
const {validationResult} = require('express-validator')

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
