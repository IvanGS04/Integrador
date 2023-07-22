const {Router} = require ("express"); //llamamos una herramienta de express
const usuario = require ("../controller/usuariosController")

const router = Router();

router.get("/",usuario.mostrarTodoU)
      .post("/",usuario.agregarU)
      .get("/:key/:value",usuario.filtroU)
      .put("/:key/:value",usuario.editarU)
      .delete("/:key/:value",usuario.eliminarU)
      
module.exports=router