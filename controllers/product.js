const Product = require('../modules/product');
module.exports.addProduct = async (product={})=>{
    
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
                        name, price, rating, avt, brand , category,color,
                        decId: newProductObjDecId,sizes:[...newSizes] 
                      };
    const newProductObj = new Product(newProduct);
    
    const newProductObjError = newProductObj.validateSync();
    
                  
      if (newProductObjError){
        let errMessage = newProductObjError.message.split(':');
        errMessage = errMessage[errMessage.length-1].trim();
        console.log(errMessage);
        return {success: false, status: 500, content:errMessage};
      }
   
    const newIdOfProduct = await newProductObj.save();
    
    if (!newIdOfProduct){
      return {success: false, status: 400, content: 'add product failed'};
    }
    return {success: true, status: 201, content:'add product success'};
  
};