const {Schema, model} = require("mongoose")

const comidaSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    ingredientes:{
        type:String,
        required:true
    },
    fecha_elaboracion:{
        type:Date,
        default:Date.now
    },
    precio:{
        type:Number,
        required:true
    }
})

module.exports=model("comida",comidaSchema,"comidas");
