const {Schema, model} = require("mongoose")

const pedidoSchema = Schema({
    comida:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    cliente:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("pedido",pedidoSchema,"pedidos");
