const {Router} = require ("express"); //llamamos una herramienta de express
const Usuario = require ("../controller/usuariosController")

const router = Router();

router.get("/",Usuario.mostrarTodo)
      .post("/",Usuario.agregar)
      .get("/:key/:value",Usuario.filtro)
      .put("/:key/:value",Usuario.editar)
      .delete("/:key/:value",Usuario.eliminar)
      
module.exports=router