const modeloPedido = require ("../model/pedidoModel");

const agregar = (req,res)=>{
    let info = req.body;
    const pedido = new modeloPedido(info);

    const {direccion, cliente, precio} = req.body;
    if(typeof direccion === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof cliente === 'number'){
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
    /*if(typeof telefono === 'string'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }*/
    
    pedido.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"Pedido agreado correctamente",
            status:"200",
            result
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al agregar el pedido",
            status:"Error",
            err
        })
            
    })
}

const mostrarTodo = (req,res)=>{
    modeloPedido.find({})
    .then((resultado)=>{
        if(!resultado){
            return res.status(202).send({
                mensaje:"No hay pedidos registrados",
                status:"OK"
            })
        }
        return res.status(200).send(
            resultado
        )
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar el pedido",
            status:"Error",
            err
        })
    })
}

const filtro = (req,res)=>{
    const correo = req.params.correo;
    modeloPedido.find({cliente:correo})
    .then((resultado)=>{
        if(!resultado) res.status(202).send({
            mensaje:"No hay pedidos registrados en la Base de datos"
        })
        return res.status(200).send(resultado)
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
    const {direccion, cliente, precio, telefono} = req.body;
    if(typeof direccion === 'number'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    if(typeof cliente === 'number'){
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
    if(typeof telefono === 'string'){
        return res.status(404).send({
            mensaje:"Error al registrar el usuario, debe ser tipo String",
            status:"Error"
            
        })
    }
    modeloPedido.findOneAndUpdate(consulta,nuevo,{new:true})
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
    modeloPedido.findOneAndDelete(consulta)
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