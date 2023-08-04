const modeloUsuario = require ("../model/usuariosModel");

const agregarU = (req,res)=>{
    let info = req.body;
    const usuario = new modeloUsuario(info);

    const {Nombre, Apellido, Telefono, Correo, Password} = req.body;
    if(typeof Nombre === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof Apellido === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof Telefono === 'string'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo Number",
            status:"Error"
            
        })
    }

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

const mostrarTodoU = (req,res)=>{
    modeloUsuario.find({})
    .then((resultado)=>{
        if(!resultado){
            return res.status(202).send({
                mensaje:"No hay usuarios registrados",
                status:"OK"
            })
        }
        return res.status(200).send(resultado)
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar el usuario",
            status:"Error",
            err
        })
    })
}

const filtroU = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloUsuario.find(consulta)
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

const editarU = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    let nuevo = req.body

    const {Nombre, Apellido, Telefono} = req.body;
    if(typeof Nombre === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof Apellido === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof Telefono === 'string'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo Number",
            status:"Error"
            
        })
    }

    modeloUsuario.findOneAndUpdate(consulta,nuevo,{new:true})
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

const eliminarU = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloUsuario.findOneAndDelete(consulta)
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
    agregarU,
    mostrarTodoU,
    filtroU,
    editarU,
    eliminarU
}