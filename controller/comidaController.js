const modeloComida = require ("../model/comidaModel");
const fs = require('fs');
//const { promisify } = require('util')
const upload = require("../uploads/storage");


//const unlinkAsync = promisify(fs.unlink)

const agregar = (req,res)=>{
    let info = req.body;
    const comida = new modeloComida(info);
    comida.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"platillo creada correctamente",
            status:"OK",
            result
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar la pieza",
            status:"Error",
            err
        })
            
    })

   
}

const mostrarTodo = (req,res)=>{
    modeloComida.find({})
    .then((resultado)=>{
        if(!resultado){
            return res.status(202).send({
                mensaje:"No hay piezas registrados",
                status:"OK"
            })
        }
        return res.status(200).send({
            resultado
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar la pieza",
            status:"Error",
            err
        })
    })
}

const filtro = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloComida.find(consulta)
    .then((resultado)=>{
        if(!resultado) res.status(202).send({
            mensaje:"No hay piezas registradas en la Base de datos"
        })
        return res.status(200).send({
            status:"ok",
            resultado
        })
    }).catch((e)=>{
        return res.status(404).send({
            status:"Error",
            e
        })
    })
}
const editar = async (req,res)=>{
    let nuevo = req.body;
    let paramImg = req.params.image;
    let id = req.params.id;
    //const nuevo = req.body;
    console.log(nuevo);
    let imgUrl = `uploads/img/${paramImg}`;

    if(req.file){
        const{ filename} = req.file;
        //comida.setImgUrl(filename);
        nuevo.imgUrl = filename

        fs.unlink(imgUrl, (err => {
            if (err){
                console.log(err);
                let imgUrl3 = `uploads/img/${filename}`;

                fs.unlink(imgUrl3, (err => {
                    if (err){
                        console.log(err);
                    }
                    else {
                      console.log(`Deleted file: ${filename}`);
                    }}))
                return res.status(400).send({mensaje:"parametro de imagen invalido"})
            }
            else {
              console.log(`Deleted file: ${paramImg}`);

                        const {nombre, ingredientes,precio} = req.body;
                if(typeof nombre === 'number'){
                    return res.status(404).send({
                        mensaje:"Error al registrar el usuario, debe ser tipo String",
                        status:"Error"
                        
                    })
                }
                if(typeof ingredientes === 'number'){
                    return res.status(404).send({
                        mensaje:"Error al registrar el usuario, debe ser tipo String",
                        status:"Error"
                        
                    })
                }
                if(typeof precio === 'string'){
                    return res.status(404).send({
                        mensaje:"Error al registrar el usuario, debe ser tipo Number",
                        status:"Error"
                        
                    })
                }

              modeloComida.findOneAndUpdate({_id:id}, nuevo ,{new:true})
              .then((resu)=>{
                  return res.status(200).send({
                      mensaje:"Se actualizó de manera correcta",
                      status:"OK",
                      resu
                  })
              }).catch((e)=>{
                
                  return res.status(404).send({
                      mensaje:"No se realizó la modificación",
                      e
                  })
              })

            }
          }));
    }else{
            return res.status(400).send({mensaje:"Imagen faltante"})
    }

        

   
}//editar

const eliminar = (req,res)=>{
    // let consulta ={}
    // consulta [req.params.key]=req.params.value
    const id = req.params.id;
    modeloComida.findOneAndDelete({_id:id})
    .then((result)=>{

        let imgUrl = `uploads/img/${result.imgUrl}`;
        fs.unlink(imgUrl, (err => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: ${result.imgUrl}`);
            }
          }));
       
        return res.status(200).send({
            mensaje:"Se elimino de manera correcta",
            status:"OK",
            result
        })
    }).catch((e)=>{
        return res.status(404).send({
            mensaje:"No se realizó la eliminación",
            e
        })
    })
}

module.exports={
    agregar,
    mostrarTodo,
    filtro,
    editar,
    eliminar
}