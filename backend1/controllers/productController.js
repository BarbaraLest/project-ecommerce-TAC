const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Criacao do produto - admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//buscar todos os produtos 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({ success: true, products })
});

//buscar detalhes de um produto
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHander("Produto não encontrado", 404))
        }

        res.status(200).json({
            success: true,
            product
        })

});

//atualizar um produto - admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Produto não encontrado", 404))
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Excluir um produto
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Produto não encontrado", 404))
    }


    await product.remove();

    res.status(200).json({
        success: true,
        message: "Produto excluido com sucesso!"
    })
});