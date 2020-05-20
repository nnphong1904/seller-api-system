const Product = require('../modules/product');
const {validateInputForAddProduct} = require('../helper/product');
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
   
    return {success: true, status: 201, content:'add product success'};
  
};