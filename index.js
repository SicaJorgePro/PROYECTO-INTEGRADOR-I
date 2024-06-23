const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

app.use(express.json());

const { connectToMongoDB, disconnectToMongoDB } = require("./Src/mongodb");

const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

// ? ruta raiz
app.get("/", (req, res) => {
  
  res.render("portada", { titulo: "PORTADA DE INICIO" });

});

// ?ruta productos total
app.get("/productos", async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    
    res.status(500).render("error",{titulo:"ERROR DE SERVIDOR"});
    return;
  }
  
  const db = client.db(base_dato);
  const productos = await db.collection(colec_base).find().sort({ id: 1 })
    .toArray();
  await disconnectToMongoDB();
   res.render("listados", {titulo:"PRODUCTOS DE VENTAS", productos})

});

// ? ruta producto por id 
app.get("/productos/:id", async (req, res) => {
  const produc_id = parseInt(req.params.id) || 0;

  if (produc_id === 0) {
    res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
    return
   }
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }
  
  const db = client.db(base_dato);
  const producto = await db.collection(colec_base).findOne({ id: produc_id });
     
  // ? desactivar base db
  await disconnectToMongoDB();
 
  if (!producto) {
                res.status(404);
  } else {
         res.status(200);
 }
  res.render("listado_producto", { titulo: "PRODUCTOS", producto });
  
});

//  ? ruta categoria por categoria
app.get("/productos/categorias/:categ", async (req, res)=>{
  const produc_cat = req.params.categ || "";
  const client = await connectToMongoDB();

  if (!client) {
    res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const db = client.db(base_dato);
  const productos = await db
    .collection(colec_base)
    .find({ categoria: { $regex: produc_cat, $options: "i" } })
    .sort({ nombre: 1 })
    .toArray();

 
  // ? desactivar base db
  await connectToMongoDB();
  console.log(Object.keys(productos));
  if (Object.keys(productos).length === 0) {
    res.status(404);
  } else {
    res.status(200);
  }
  res.render("listados", { titulo: "PRODUCTOS POR CATEGORIA", productos });
});

// ? ruta con post crear un nuevo registro
app.post("/productos", async (req, res) => {
  const nuevoproducto = req.body;
  const reg_id = nuevoproducto.id;
  
  if (Object.keys(nuevoproducto).length === 0) {
            return res.status(422).send("ERROR...! NO HAY DATOS PARA AGREGAR");
  }
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
      return;
  }
  
    // ? verificar si el registro existe
  const db = client.db(base_dato);
  const reg_existente = await db.collection(colec_base).findOne({ id: reg_id });
  
  if (reg_existente) {
    res.status(302).send("Error...! Registro existente")
    await disconnectToMongoDB();
    return
  } else {
    const collection = client.db(base_dato).collection(colec_base);
    collection.insertOne(nuevoproducto)
      .then((response) => res.status(201).json(nuevoproducto))
      .catch((error) => res.status(500).send("Error al crear el registro"))
      .finally(async () => {
        await disconnectToMongoDB();
      });
  }});

// ? ruta con put modificar registro
app.put("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const modifproducto = req.body;
  const reg_modif = id;

  if (Object.keys(modifproducto).length === 0) {
    return res.status(422).send("Error en el formato de los datos");
  }
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
      return;
    }
  const db = client.db(base_dato);
  const reg_exi_modi = await db.collection(colec_base).findOne({id:reg_modif});
   
  if (!reg_exi_modi) {
    res.status(302).send("Error...! Registro NO existente");
    await disconnectToMongoDB();
    return;
  } else {
    const collection = client.db(base_dato).collection(colec_base);
    collection
      .updateOne({ id }, { $set: modifproducto })
      .then((response) => res.status(201).json(modifproducto))
      .catch((error) => res.status(500).send("Error al crear el registro"))
      .finally(async () => {
        await disconnectToMongoDB();
      });
  }
});

// ? ruta con delete elimina fisicamente el  registro
app.delete("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  if (!req.params.id) {
    res.status(422).send("Error en el formato de los datos");
    return;
  }

  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const collection = client.db(base_dato).collection(colec_base);
  collection
    .deleteOne({ id })
    .then((response) => {
      if (response.deletedCount === 0) {
        res.status(404).send(`No existe el registro con ID: ${id}`);
      } else {
        res.status(202).send("Registro eliminado");
      }
    })
    .catch((error) => res.status(500).send("Error al borrar el registro"))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});


// ? si la ruta no existe
app.use((req, res) => {
  res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

