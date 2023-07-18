const {Schema, model} = require("mongoose")

const usuariosSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    Apellido:{
        type:String,
        required:true
    },
    NumeroTelefono:{
        type:Number,
        required:true
    }
})

module.exports=model("usuario",comidaSchema,"usuarios");