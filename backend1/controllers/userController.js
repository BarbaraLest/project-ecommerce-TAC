const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

//Registrando um usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
   
    const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "asasd",
      url: "asasd",
    },
  });

  const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    })
});


//Login usuario
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  //verificacao de senha/email usuario
  if(!email || !password){
    return next(new ErrorHander("Por favor, insira um email e uma senha", 400))
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorHander("Email ou senha invalido", 401))
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHander("Senha invalida", 401))
  }

  const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token,
    })


  
});




