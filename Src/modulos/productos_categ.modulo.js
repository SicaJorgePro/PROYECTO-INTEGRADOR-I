//? activar y desactivar la base
const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

//? llamar a variables de entorno que son nombres de la base
//? y nombre de la colección
const base_dato = process.env.base;
const colec_base = process.env.coleccion_base;

const mod_base = require("../modulos/errorbaseDato.modulo");

const modulo_Prod_cat = async (produc_cat) => {

  try {
    const client = await connectToMongoDB();
    const baseError = await mod_base.base_error(client); // **modulo de verificar base
    if (baseError==false){
      const db = client.db(base_dato);
      const producto = await db.collection(colec_base)
        .find({ categoria: { $regex: produc_cat, $options: "i" } })
        .sort({ nombre: 1 })
        .toArray();
      if (Object.keys(producto).length === 0) {
        const error = new Error("CATEGORIA NO EXISTE");
        error.status = 404;
        throw error;
      }
      return producto;
    } 
  } catch (error) {
    throw error;

  } finally {
    await disconnectToMongoDB();
  }
};

module.exports = {
  modulo_Prod_cat,
};
