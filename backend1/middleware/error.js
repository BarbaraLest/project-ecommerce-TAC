const ErrorHandler = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno no servidor";

    //controle de erro para ids fora do padrão mongodb
    if(err.name === "CastError"){
        const message = `Por favor, insira um id valido.`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};

