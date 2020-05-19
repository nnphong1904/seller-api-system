const Product = require('../modules/product');
const mongoose = require('mongoose');
module.exports.addProduct = async (product)=>{
  const newProductObjDecId = await Product.find({}).countDocuments('_id');
  let {sizesName, sizesQuantity, name, price, rating, avt, brand, category, color }=product;
  sizesName=sizesName.split(',');
  sizesQuantity=sizesQuantity.split(',');
  console.log(sizesQuantity)
  const newSizes = [];
    for (let i=0; i<sizesQuantity.length; i++){
      const size={size: sizesName[i], noItems: parseInt(sizesQuantity[i])};
      newSizes.push(size);
    }
  const newProduct = {name, price, rating, avt, brand, category, color , decId: newProductObjDecId, sizes: [...newSizes]};
  const newProductObj = new Product(newProduct);
  const newIdOfProduct = await newProductObj.save();
  console.log(newIdOfProduct);
  // console.log(newProduct);
};