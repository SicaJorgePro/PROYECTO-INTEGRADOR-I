//? activar y desactivar la base 
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamr a varibles de entorno que son nombre de la base 
//? y nombre de la coleccion
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

// ! funcion de mostar todos los productos
const productos_all = async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).render("error", { titulo: "ERROR DE SERVIDOR" });
    return;
  }

  const db = client.db(base_dato);
  const productos = await db
    .collection(colec_base)
    .find()
    .sort({ id: 1 })
    .toArray();
  await disconnectToMongoDB();
  res.render("listados", { titulo: "PRODUCTOS DE VENTAS", productos });
};

// ! funcion de mostar productos por identificacion
const productos_id = async (req, res) => {
  const produc_id = parseInt(req.params.id) || 0;
  
  if (produc_id === 0) {
    res.status(404).render("error_404", { titulo: "PAGINA NO ENCONTRADA" });
    return;
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
};

// ! funcion de mostar productos por categoria

const produc_categoria = async (req, res) => {
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
  await disconnectToMongoDB();

  if (Object.keys(productos).length === 0) {
    res.status(404);
  } else {
    res.status(200);
  }
  res.render("listados", { titulo: "PRODUCTOS POR CATEGORIA", productos });
};



module.exports = {
  productos_all,
  productos_id,
  produc_categoria
};
