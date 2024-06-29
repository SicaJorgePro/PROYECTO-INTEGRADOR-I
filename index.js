const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

// ubicacion del rutas 
const mainrouters = require("./Src/routers/main.routers");
const productosRouter = require("./Src/routers/productos.routers")
const GRUD_Router = require("./Src/routers/GRUD_produ.routers");



app.use(express.json());

// ? ruta raiz
app.use(mainrouters);

//  ? mostar los productos all / id/ categoria
app.use("/productos",productosRouter);


// ? ruta con post crear un nuevo registro
app.use("/productos", GRUD_Router);

//? ruta para modifacr productos
app.use("/productos", GRUD_Router);

//? ruta para borrar productos
app.use("/productos", GRUD_Router);

//? cuando no existe la ruta
app.use((req, res) => {
  res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

