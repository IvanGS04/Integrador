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
    }

})

module.exports=model("usuario",usuarioSchema,"usuarios");