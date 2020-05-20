const Product = require('../modules/product');
const {validateInputForAddProduct} = require('../helper/product');
const mongoose = require('mongoose');
module.exports.addProduct = async (product)=>{

    if (validateInputForAddProduct(product) === false){
      return {success: false, status: 400, content:'add failed, you are missing some field'};
    }
    const newProductObjDecId = await Product.find({}).countDocuments('_id');
    let {sizesName, sizesQuantity, name, price, rating, avt, brand, category, color }=product;
   
    sizesName=sizesName.split(',');
    sizesQuantity=sizesQuantity.split(',');
    const newSizes = [];
      for (let i=0; i<sizesQuantity.length; i++){
        const size={size: sizesName[i], noItems: parseInt(sizesQuantity[i])};
        newSizes.push(size);
      }
    const newProduct = {
                        name, price, rating, avt, brand,category , color,
                        decId: newProductObjDecId+1,sizes:[...newSizes] 
                      };
    const newProductObj = new Product(newProduct);
    
    const newProductObjError = newProductObj.validateSync();
    
   
      if (newProductObjError){
        let errMessage = newProductObjError._message;
        return {success: false, status: 400, content:errMessage};
      }
   
    const newIdOfProduct = await newProductObj.save();
    
    if (!newIdOfProduct){
      return {success: false, status: 400, content:'add product failed'};
    }
   
    return {success: true, status: 201, content:'add product success', productId: newIdOfProduct._id};
  
};

module.exports.deleteProduct = async (productId='')=>{
  const responseAfterDelete = await Product.findOneAndDelete({_id: productId});
  if (responseAfterDelete === null){
    return {success: false, status:404, content:'product does not exist', productId:''};
  }
  return {success: true, status: 200, content:'remove product success', productId:responseAfterDelete._id};
}