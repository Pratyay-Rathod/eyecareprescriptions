const Staff = require("../Model/Staff");
const User = require("../Model/User");

module.exports.staff_display = async (req,res) => {
    try{
        const response = await Staff.find({});
        if(response){
            res.status(200).json({response:response});
        }
    }
    catch(error){
        res.status(404).json({error:error});
        console.log(error);
    }
}

module.exports.admin_details = async (req,res) => {
    try{
        const response = await User.find({});
        if(response){
            res.status(200).json({response:response});
        }
    }
    catch(error){
        res.status(404).json({error:error});
        console.log(error);
    }
}