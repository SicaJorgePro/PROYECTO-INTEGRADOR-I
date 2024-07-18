
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
 

  
};


module.exports = {
  DeleteProductos,
};