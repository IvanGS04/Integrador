const {Router} = require ("express"); //llamamos una herramienta de express
const comidaC = require ("../controller/comidaController")

const router = Router();

router.get("/",comidaC.mostrarTodo)
      .post("/",comidaC.agregar)
      .get("/:key/:value",comidaC.filtro)
      .put("/:key/:value",comidaC.editar)
      .delete("/:key/:value",comidaC.eliminar)
      
module.exports=router