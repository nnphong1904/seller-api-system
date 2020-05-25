const Product = require('../modules/product');
const {validateInputForAddProduct, validateInputForSizeInput, generateSizesObject} = require('../helper/product');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
module.exports.addProduct = async (product)=>{
    let returnedObject = {}
    if (validateInputForAddProduct(product) === false){
      return {success: false, status: 400, content:'add failed, you are missing some field'};
    }
    else{
      const newProductObjDecId = await Product.find({}).countDocuments('_id')+1;
      let {sizesName, sizesQuantity, name, price, avt, brand, category, color } = product;
      const rating = '0';
      if (validateInputForSizeInput(sizesName, sizesQuantity) === false){
        return {success: false, status: 400, content: 'add failed, you forget to input quantity of some size'};
      }
      else{
        const colorsList = color.split(',').map(color=>color.trim());
        const categoryList = category.split(',').map(categoryElement=>categoryElement.trim());
        
        const newSizes = [...generateSizesObject(sizesName, sizesQuantity)];
        const newProduct = {
                            name, price, rating, avt, brand, category:[...categoryList] , color: [...colorsList],
                            decId: newProductObjDecId+1,sizes:[...newSizes]
                          };
        const newProductObj = new Product(newProduct);
        const newProductObjError = newProductObj.validateSync();
        
          if (newProductObjError){
            let errMessage = newProductObjError._message;
            return {success: false, status: 400, content:errMessage};
          }
      
        const newIdOfProduct = await newProductObj.save();
      
        return {success: true, status: 201, content:'add product success', productId: newIdOfProduct._id};
      }
    }
};

module.exports.deleteProduct = async (productId)=>{
  if (!productId){
    return {success: false, status: 400, content:'product id is empty'};
  }
  const responseAfterDelete = await Product.findOneAndDelete({_id: productId});
  if (responseAfterDelete === null){
    return {success: false, status:404, content:'product does not exist', productId:''};
  }
  else{
    return {success: true, status: 200, content:'remove product success', productId:responseAfterDelete._id};
  }
}
module.exports.updateProduct = async (productId, sizesName, sizesQuantity)=>{
  if (!productId){
    return {success: false, status:404, content:'product not found'};
  }
  else
  {
    let newSizesObject;

    if (generateSizesObject(sizesName, sizesQuantity) === null){
      return {success: false, status: 400, content:'fill in new sizes for product'};
    }
    else{
      const oldProduct =  await Product.findOne({_id:productId});
      if (oldProduct === null){
        return {success: false, status: 404, content: 'product not found'};
      }
      else{
        newSizesObject = [...generateSizesObject(sizesName,sizesQuantity)];
        const newProduct = {...oldProduct._doc, sizes: {...newSizesObject}};
        const responseAfterUpdate = await Product.findByIdAndUpdate(productId, newProduct, {new:true });
        return {success: true, status: 200, content: 'update success', productId: responseAfterUpdate._id};
      }
    }
  }
}