const mongoose = require ("mongoose");

const conexion = async()=>{ //la funcion async es un "proceso" que espera a que suceda algo 
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/KangrePonce")
        console.log("La conexion se realizo de manera correcta")
    }catch(e){
        console.log(`No se pudo conectar a la base de datos ${e}`)
    }
}

module.exports=conexion;