// //? activar y desactivar la base
// const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

// //? llamr a varibles de entorno que son nombre de la base
// //? y nombre de la coleccion
// const base_dato = process.env.base;
// const colec_base = process.env.coleccion_base;

const modulo_altasProducto=require("../modulos/altasProductos.modulos")

const altasProductos = async (req, res) => {
  const nuevoproducto = req.body;
  const reg_id = nuevoproducto.id;
  try {
    if (Object.keys(nuevoproducto).length === 0) {
      const error = new Error("ERROR...! NO HAY DATOS PARA AGREGAR!!!");
      error.status = 422;
      throw error;
             
    }
    const Altas_Productos = await modulo_altasProducto.ModuloaltasProd(
      reg_id, nuevoproducto);
    console.log("4")
  
    return;
  } catch (error) {
    console.log("5");
    console.log(error.status);
    if (error.status == 202) {
      res.status(error.status).json(nuevoproducto);
    } else {
      res.status(error.status).send(error.message);
    }
  }
}
 

//   if (Object.keys(nuevoproducto).length === 0) {
//     return res.status(422).send("ERROR...! NO HAY DATOS PARA AGREGAR");
//   }
//   const client = await connectToMongoDB();
//   if (!client) {
//     res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
//     return;
//   }

//   // ? verificar si el registro existe
//   const db = client.db(base_dato);

//   const reg_existente = await db.collection(colec_base).findOne({ id: reg_id });

//   if (reg_existente) {
          //     res.status(302).send("Error...! Registro existente");
          //     await disconnectToMongoDB();
          //     return;
//   } else {
//     const collection = client.db(base_dato).collection(colec_base);
//     collection
//       .insertOne(nuevoproducto)
//       .then((response) => res.status(201).json(nuevoproducto))
//       .catch((error) => res.status(500).send("Error al crear el registro"))
//       .finally(async () => {
//         await disconnectToMongoDB();
//       });
//   }
// };


module.exports = {
  altasProductos
};