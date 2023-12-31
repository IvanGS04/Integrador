const modeloComida = require ("../model/comidaModel");
const fs = require('fs');
//const { promisify } = require('util')
const upload = require("../uploads/storage");


//const unlinkAsync = promisify(fs.unlink)

const agregar = (req,res)=>{
    let info = req.body;
    const comida = new modeloComida(info);
    const {nombre, ingredientes} = req.body;
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
    // if(typeof precio === 'string'){
    //     return res.status(404).send({
    //         mensaje:"Error al registrar el usuario, debe ser tipo Number",
    //         status:"Error"
            
    //     })
    // }

    if(req.file){
        const{ filename} = req.file;
        comida.setImgUrl(filename);

        comida.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"Pieza creada correctamente",
            status:"200",
            result
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar la pieza",
            status:"Error",
            err
        })
            
    })

    }else{
        return res.status(500).send({mensaje:"falta imagen"})
    }
   
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
        return res.status(200).send(resultado)
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar la pieza",
            status:"Error",
            err
        })
    })
}



const filtro = (req,res)=>{
    let id =req.params.id
    modeloComida.findOne({_id:id})
    .then((resultado)=>{
        if(!resultado) res.status(202).send({
            mensaje:"el platillo no se encuentra"
        })
        return res.status(200).send(
            resultado
        )
    }).catch((e)=>{
        return res.status(404).send({
            status:"Error",
            e
        })
    })
}
const editar = (req,res)=>{
    const nuevo = req.body;
    const id = req.params.id;
    console.log(id);
    console.log(nuevo);

                        const {nombre, ingredientes} = req.body;
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
                // if(typeof precio === 'string'){
                //     return res.status(404).send({
                //         mensaje:"Error al registrar el usuario, debe ser tipo Number",
                //         status:"Error"
                        
                //     })
                // }

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