const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
  res.render('add-product',
  {
    pageTitle:'Add product',
    path:'/admin/add-product',
    activeAddProduct:true,
    productCSS:true,
    formsCSS:true
  })
}
exports.postAddProduct = (req, res, next) => {

  const product = new Product(req.body.title)
  product.save();
  res.redirect('/');

}

exports.getProducts = (req, res, next) => {
  
  const products = Product.fetchAll().then((products)=>{
    res.render('shop',{ 
      prods: products, 
      pageTitle: "Shop", 
      path: "/", 
      hasProducts: products.length > 0 ? true : false, 
      activeShop:true,
      productCSS:true
    })
  });

  

}