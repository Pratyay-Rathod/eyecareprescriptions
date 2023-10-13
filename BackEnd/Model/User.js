const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        minlength:[6,"username must contains 6th characters"],
        required:[true,"Please Enter User Name"],
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        minlength:[6,"email must contains 6th characters"],
        required:[true,"Please Enter Email Id"],
        validate:[isEmail,"Please Enter Valid Email Id"],
    },
    password:{
        type:String,
        required:[true,"PLease Enter Password"],
        minlength:[6,"Password must be contains 6 Characters"],
    },
    token:{
        type:String,
        require:[true,"Can not generate Token"]
    }
});

// -- print saving before user saving to the collections --//

userSchema.pre('save',async function(next){
    const sault = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,sault);
})

userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username});
    if(user){
       const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
}

const user = mongoose.model("Admin",userSchema);

module.exports = user;