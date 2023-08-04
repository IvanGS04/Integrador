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
    },
    imgUrl:{
        type: String,
        required: true
    }
})

comidaSchema.methods.setImgUrl = function setImgUrl (filename){
    //const APP_HOST = "http://localhost"
    //const APP_PORT = "3000"
    //`${APP_HOST}:${APP_PORT}/public/${filename}`
    this.imgUrl = filename;

}

module.exports=model("comida",comidaSchema,"comidas");
