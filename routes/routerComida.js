const {Router} = require ("express"); //llamamos una herramienta de express
const comidaC = require ("../controller/comidaController")
const upload = require("../uploads/storage");

const router = Router();

router.get("/",comidaC.mostrarTodo)
      .post("/", upload.single('file'), comidaC.agregar)
      .get("/filtro/:id", comidaC.filtro)
      .put("/:id", comidaC.editar)
      .delete("/:id",comidaC.eliminar)
      
module.exports=router