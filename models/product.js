    import mongoose from "mongoose";

    const productSchenma = new mongoose.Schema({
        productId :{
            type : String,
            required : true,
            unique : true
        },

        name : {
            type : String,
            required : true
        },

        altName : {
            type : [String],
            default : []
        },

        price : {
            type: Number,
            required : true
        },
        labledPrice : {
            type : Number,
            required : true 
        },

        description : {
            type : String,
            required : false
        },

        images : {
            type : [String],
            default : ["https://www.freepik.com/free-vector/bird-colorful-gradient-design-vector_35322171.htm#fromView=keyword&page=1&position=0&uuid=2a779423-1c2d-4cb1-bbf1-9a0a8af445e6&query=Free+logo+png"]
        },
        stocks : {
            type : Number,
            required : true,
        },
    })

    const Product = new mongoose.model("Product", productSchenma);

    export default Product; 