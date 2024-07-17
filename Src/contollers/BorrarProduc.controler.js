// //? activar y desactivar la base
// const { connectToMongoDB, disconnectToMongoDB } = require("../db/mongodb");

// //? llamr a varibles de entorno que son nombre de la base
// //? y nombre de la coleccion
// const base_dato = process.env.base;
// const colec_base = process.env.coleccion_base;

const modulo_deleteProductos = require("../modulos/deleteProducto.modulo");


const DeleteProductos = async (req, res) => {
  const id = parseInt(req.params.id) || 0;
  try {
    const borrar = await modulo_deleteProductos.moduloBorrar(id)
    if (borrar.deletedCount === 0) {
                const error = new Error("Error.. Registro No existe");
                error.status = 404;
                throw error;
    } else {
      res.status(202).send("Registro eliminado");
      return;
    }
   
  } catch (error) {
            res.status(error.status).send(error.message);
}
 

  // const client = await connectToMongoDB();
  // if (!client) {
  //   res.status(500).res.render("error", { titulo: "ERROR DE SERVIDOR" });
  //   return;
  // }

  // const collection = client.db(base_dato).collection(colec_base);
  // collection
  //   .deleteOne({ id })
  //   .then((response) => {
  //     if (response.deletedCount === 0) {
  //       res.status(404).send(`No existe el registro con ID: ${id}`);
  //     } else {
  //       res.status(202).send("Registro eliminado");
  //     }
  //   })
  //   .catch((error) => res.status(500).send("Error al borrar el registro"))
  //   .finally(async () => {
  //     await disconnectToMongoDB();
  //   });
};


module.exports = {
  DeleteProductos,
};