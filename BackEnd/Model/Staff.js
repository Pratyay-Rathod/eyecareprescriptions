const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: [6, "username must contains 6th characters"],
        required: [true, "Please Enter User Name"],
    },
    password: {
        type: String,
        required: [true, "PLease Enter Password"],
        minlength: [6, "Password must be contains 6 Characters"],
    },
    contactNumber: {
        type: String,
        minlength: [10, "Phone number is Invalid"]
    },
    token: {
        type: String,
        required: [true, "Can not generate token"],
    }
});

userSchema.pre('save', async function (next) {
    const sault = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, sault);
    next();
})

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
}

const staff = mongoose.model("Staff", userSchema);

module.exports = staff;