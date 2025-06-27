const userModel = require('../models/user.model')


module.exports.creatUser = async ({
        fullname, email, password 
}) =>{
        if(!fullname || !fullname.firstname || !fullname.lastname || ! email || !password){
                throw new Error ('all fields are required')
                
        }
        const {firstname,lastname}=fullname
        const user = await userModel.create({
                fullname : {
                        firstname,
                        lastname
                },
                email,
                password
        })

        return user
}