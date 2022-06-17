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




