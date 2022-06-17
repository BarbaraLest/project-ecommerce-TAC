const ErrorHandler = require('../utils/errorHander');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || 'Erro interno no servidor';

	//controle de erro para ids fora do padrão mongodb
	if (err.name === 'CastError') {
		const message = `Por favor, insira um id valido.`;
		err = new ErrorHandler(message, 400);
	}

	//controle de erro para duplicidade de parametros que n podem ter duplicidade
	if (err.code === 11000) {
		const message = `Duplicado de ${Object.keys(err.keyValue)} `;
		err = new ErrorHandler(message, 400);
	}

	//controle de erro p JWT errado
	if (err.name === 'JsonWebTokenError') {
		const message = `Esse token é invalido, tente novamente`;
		err = new ErrorHandler(message, 400);
	}

	//controle de erro p JWT expirado
	if (err.name === 'TokenExpiredError') {
		const message = `Este token já expirou, tente novamente`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		error: err.message,
	});
};
