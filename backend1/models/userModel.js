const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, insira o seu nome"],
        maxLength: [60, "O nome não pode passar de 60 caracteres"],
        minLength: [3, "O nome não pode ter menos de 3 caracteres"],
    },
    email: {
        type: String,
        required: [true, "Por favor, insira o seu email"],
        unique: true,
        validate: [validator.isEmail, "Por favor, insira um email valido."]
    },
    password: {
        type: String,
        required: [true, "Por favor, insira a sua senha"],
        minLength: [4, "A senha não pode ter menos de 3 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    //criptografia da senha
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//comparacao senha (criptografada)
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  

module.exports = mongoose.model("User", userSchema);