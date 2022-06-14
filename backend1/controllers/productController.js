const Product = require("../models/productModel");

//Criacao do produto - admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// buscar todos os produtos 
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({ success: true, products })
}

// atualizar um produto - admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            sucess: false,
            message: "Produto não encontrado"
        })
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
}

//Excluir um produto

exports.deleteProduct = async(req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            sucess: false,
            message: "Produto não encontrado"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Produto excluido com sucesso!"
    })
}