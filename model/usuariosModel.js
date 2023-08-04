const {Schema, model} = require("mongoose")

const usuarioSchema = Schema({
    Nombre:{
        type:String,
        required:true
    },
    Apellido:{
        type:String,
        required:true
    },
    Telefono:{
        type:Number,
        unique: true,
        required:true
    },
    Correo:{
        type:String,
        unique: true,
        required:true
    },
    Password:{
        type:String,
        required:true
    }

})

module.exports=model("usuario",usuarioSchema,"usuarios");