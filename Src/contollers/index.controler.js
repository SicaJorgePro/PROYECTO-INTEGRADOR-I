
const index=(req, res) => {
  res.render("portada", { titulo: "PORTADA DE INICIO" });
}

module.exports = { index }; 