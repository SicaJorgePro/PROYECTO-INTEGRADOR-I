
const modulo_p = require("../modulos/productos.modulo");
const moduloProd_id = require("../modulos/producto_id.modulo");
const noduloProd_Cat=require("../modulos/productos_categ.modulo")


// ! funcion de mostar todos los productos

const productos_all = async (req, res) => {
      try {
        const productos = await modulo_p.modulo_prod(); //! llamar al modulo
        
        res.status(200).render("listados", {
          titulo: "PRODUCTOS DE VENTAS",
          productos,
        });
      } catch (error) {
        res.status(error.status).render("error", { titulo: error.message });
        return;
      }
 
};

// ! funcion de mostar productos por identificacion

const productos_id = async (req,res) => {

  const produc_id = parseInt(req.params.id) || 0;
  
  try {
    
     const producto = await moduloProd_id.modulo_Prod_Id(produc_id); //** llamar al modulo
      res
        .status(200)
        .render("listado_producto", { titulo: "PRODUCTOS", producto });
     
  } catch (error) {
    if (error.status=== 404){
      return res
        .status(error.status)
        .render("error_404", { titulo: error.message });
    }
    return res.status(error.status).render("error", { titulo: error.message });
   
  }
 
};

// ! funcion de mostar productos por categoria

const produc_categoria = async (req, res) => {

  const produc_cat = req.params.categ || "";
  try {
    const productos = await noduloProd_Cat.modulo_Prod_cat(produc_cat);
    res.status(200).render("listados", { titulo: "PRODUCTOS POR CATEGORIA",productos});
    

} catch (error) {
        if (error.status === 404) {
          return res
            .status(error.status)
            .render("error_404", { titulo: error.message });
    } else{
          return res
            .status(error.status)
            .render("error", { titulo: error.message });

    }
         
}
 
};


module.exports = {
  productos_all,
  productos_id,
  produc_categoria
};
