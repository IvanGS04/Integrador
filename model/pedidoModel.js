const {Schema, model} = require("mongoose")

const pedidoSchema = Schema({
    direccion:{
        type:String,
        required:true
    },
    cliente:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    telefono:{
        type:Number,
        required:true,
    }
})

module.exports=model("pedido",pedidoSchema,"pedidos");
