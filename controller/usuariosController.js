const modeloUsuarios = require ("../model/usuariosModel");

const agregar = (req,res)=>{
    let info = req.body;
    const usuario = new modeloUsuarios(info);
    usuario.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"Usuario agregado correctamente",
            status:"OK",
            result
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar el usuario",
            status:"Error",
            err
        })
            
    })
}

const mostrarTodo = (req,res)=>{
    modeloUsuarios.find({})
    .then((resultado)=>{
        if(!resultado){
            return res.status(202).send({
                mensaje:"usuarios",
                status:"OK"
            })
        }
        return res.status(200).send({
            resultado
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"error",
            status:"Error",
            err
        })
    })
}

const filtro = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloUsuarios.find(consulta)
    .then((resultado)=>{
        if(!resultado) res.status(202).send({
            mensaje:"No hay usuarios registrados en la Base de datos"
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
    modeloUsuarios.findOneAndUpdate(consulta,nuevo,{new:true})
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
    modeloUsuarios.findOneAndDelete(consulta)
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