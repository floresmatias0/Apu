const { Product, Categories } = require("../../db");

module.exports = {

  createProduct: async (product) => {
    return await Product.create(product).then(product =>  product );  
  },

  addCategoryToProduct: async (idProducto, idCategoria) => {
    return await Product.findByPk(idProducto).then( async (oneProduct) => {
      return await Categories.findByPk(idCategoria)
        .then((newcategory) => {
          oneProduct.addCategory(newcategory);
          return newcategory;
        });
     });
 },
 
};
