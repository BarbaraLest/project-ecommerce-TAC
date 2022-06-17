const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, insira o nome do produto"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Por favor, insira a descrição do produto"]

    },
    price: {
        type: String,
        required: [true, "Por favor, insira o preço do produto"],
        maxlength: [8, "O preço não pode passar de 8 caracteres"]

    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Por favor, insira a categoria do produto"]
    },
    Stock: {
        type: Number,
        required: [true, "Por favor, insira o estoque do produto"],
        maxlength: [4, "O estoque não pode passar de 4 caracteres"],
        default: 1
    },
    //avaliacoes

    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);