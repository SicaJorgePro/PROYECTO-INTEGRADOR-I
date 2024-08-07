const express = require("express");
const app = express();

const path = require("path");

const layouts=require("express-ejs-layouts")

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));
app.use(layouts)
app.set("layout","layouts/layout")

// * ubicacion del rutas del proyectos
const mainrouters = require("./Src/routers/main.routers");
const productosRouter = require("./Src/routers/productos.routers")
const GRUD_Router = require("./Src/routers/GRUD_produ.routers");

app.use(express.json());


// ? ruta raiz
app.use(mainrouters);

//  ? mostar los productos all / id/ categoria
app.use("/productos",productosRouter);


// ? ruta para crear un nuevo registro <POT>
app.use("/productos", GRUD_Router);

//? ruta para modifacr productos <PUT>
app.use("/productos", GRUD_Router);

//? ruta para borrar productos <DELETE>
app.use("/productos", GRUD_Router);

// ? cuando no existe la ruta
app.use((req, res) => {
  res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA!!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

