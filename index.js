const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

// ubicacion del rutas 
const mainrouters = require("./Src/routers/main.routers");
const productosRouter = require("./Src/routers/productos.routers")
const ingreso_prodRouter = require("./Src/routers/ingreso_produ.routers");
const modificar_ProductRouter = require("./Src/routers/Modifcar_Produ.routers");
const  borrar_ProductRouter = require("./Src/routers/borrar_produ.routers");


app.use(express.json());

// ? ruta raiz
app.use(mainrouters);

//  ? mostar los productos all / id/ categoria
app.use("/productos",productosRouter);

// ? ruta con post crear un nuevo registro
app.use("/productos",ingreso_prodRouter);

//? ruta para modifacr productos
app.use("/productos",modificar_ProductRouter);

//? ruta para borrar productos
app.use("/productos",borrar_ProductRouter);

//? cuando no existe la ruta
app.use((req, res) => {
  res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

