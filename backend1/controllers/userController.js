const ErrorHander = require('../utils/errorHander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//Registrando um usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: 'asasd',
			url: 'asasd',
		},
	});

	sendToken(user, 200, res);
});

//Login usuario
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	//verificacao de senha/email usuario
	if (!email || !password) {
		return next(new ErrorHander('Por favor, insira um email e uma senha', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHander('Email ou senha invalido', 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Senha invalida', 401));
	}

	sendToken(user, 200, res);
});

//logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Deslogado',
	});
});

//recuperação de senha -- envio de email de recuperação
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander('Usuário não encontrado', 404));
	}

	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

	const message = `O seu token de recuperação de senha é: - \n\n ${resetPasswordUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Ecommerce Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

//recuperação de senha -- troca de senha
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorHander('O token é inválido ou expirou', 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander('Password does not password', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

//listar os detalhes de um usuário
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

//atualizando a senha de um usuário
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander('A senha antiga esta incorreta', 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander('As senhas não são iguais', 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

//atualizando o perfil de um usuário
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	// if (req.body.avatar !== '') {
	// 	const user = await User.findById(req.user.id);

	// 	const imageId = user.avatar.public_id;

	// 	await cloudinary.v2.uploader.destroy(imageId);

	// 	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
	// 		folder: 'avatars',
	// 		width: 150,
	// 		crop: 'scale',
	// 	});

	// 	newUserData.avatar = {
	// 		public_id: myCloud.public_id,
	// 		url: myCloud.secure_url,
	// 	};
	// }

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});
