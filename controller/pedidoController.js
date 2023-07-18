const modeloPedido = require ("../model/pedidoModel");

const agregar = (req,res)=>{
    let info = req.body;
    const pedido = new modeloPedido(info);
    pedido.save()
    .then((result)=>{
        return res.status(200).send({
            mensaje:"Pedido agreado correctamente",
            status:"OK",
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
        return res.status(200).send({
            resultado
        })
    }).catch((err)=>{
        return res.status(404).send({
            mensaje:"Error al registrar el pedido",
            status:"Error",
            err
        })
    })
}

const filtro = (req,res)=>{
    let consulta ={}
    consulta [req.params.key]=req.params.value
    modeloPedido.find(consulta)
    .then((resultado)=>{
        if(!resultado) res.status(202).send({
            mensaje:"No hay pedidos registrados en la Base de datos"
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