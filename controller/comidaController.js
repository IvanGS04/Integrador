const modeloComida = require ("../model/comidaModel");

const agregar = (req,res)=>{
    let info = req.body;
    const comida = new modeloComida(info);

    if(req.file){
        const{ filename} = req.file;
        comida.setImgUrl(filename);

        comida.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"Pieza creada correctamente",
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

    }else{
        console.log("no se subio ninguna imagen");
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

const editar = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    let nuevo = req.body
    modeloComida.findOneAndUpdate(consulta,nuevo,{new:true})
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

const eliminar = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloComida.findOneAndDelete(consulta)
    .then((result)=>{
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