const {Router} = require ("express"); //llamamos una herramienta de express
const pedidoC = require ("../controller/pedidoController")

const router = Router();

router.get("/",pedidoC.mostrarTodo)
      .post("/",pedidoC.agregar)
      .get("/:key/:value",pedidoC.filtro)
      .put("/:key/:value",pedidoC.editar)
      .delete("/:key/:value",pedidoC.eliminar)
      
module.exports=router