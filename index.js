const express = require("express"); //mandamos a llamar el frame de express
const conexion = require ("./conexion/conexion")
const router = require ("./routes/routerComida")

const app = express(); //almacenamos express en una constante llamada app

conexion();

app.use(express.json())
//decodifica la informacion y la convierte en formato JSON
app.use(express.urlencoded({extended:true}));

app.use("/comida",router)

app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000")//creamos el servidor en el puerto 3000
})

