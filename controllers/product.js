const Product = require('../modules/product');
const {validateInputForAddProduct, validateInputForSizeInput, generateSizesObject} = require('../helper/product');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
module.exports.addProduct = async (product)=>{
    if (validateInputForAddProduct(product) === false){
      return {success: false, status: 400, content:'add failed, you are missing some field'};
    }
    const newProductObjDecId = await Product.find({}).countDocuments('_id');
    let {sizesName, sizesQuantity, name, price, rating, avt, brand, category, color } = product;
    
    if (validateInputForSizeInput(sizesName, sizesQuantity) === false){
      return {success: false, status: 400, content: 'add failed, you forget to input quantity of some size'};
    }
    // sizesName=sizesName.split(',');
    // sizesQuantity=sizesQuantity.split(',');
    const colorsList = color.split(',').map(color=>color.trim());
    const categoryList = category.split(',').map(categoryElement=>categoryElement.trim());
    const day = new Date().getDay();
    let date = new Date().getDate();
    if(date === 1) {
      date = `${date}st`;
    }
    else if (date === 2){
      date = `${date}nd`;
    }
    else if (date === 3){
      date = `${date}rd`;
    }
    else {
      date = `${date}th`;
    }
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const createAt = `${DAY[day]}, ${date}, ${MONTHS[month]}, ${year}`;

    // const newSizes = [];
    //   for (let i=0; i<sizesQuantity.length; i++){
    //     const size={size: sizesName[i], noItems: parseInt(sizesQuantity[i])};
    //     newSizes.push(size);
    //   }
    const newSizes = [...generateSizesObject(sizesName, sizesQuantity)];
    const newProduct = {
                        name, price, rating, avt, brand, category:[...categoryList] , color: [...colorsList],
                        decId: newProductObjDecId+1,sizes:[...newSizes], createAt
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
module.exports.updateProduct = async (productId='', sizesName, sizesQuantity)=>{
  if (productId === ''){
    return {success: false, status:404, content:'product not found'};
  }
  let newSizesObject;

  if (generateSizesObject(sizesName, sizesQuantity) === null){
    return {success: false, status: 400, content:'fill in new sizes for product'};
  }
  const oldProduct =  await Product.findOne({_id:productId});
  if (oldProduct === null){
    return {success: false, status: 404, content: 'product not found'};
  }
  newSizesObject = [...generateSizesObject(sizesName,sizesQuantity)];
  const newProduct = {...oldProduct._doc, sizes: {...newSizesObject}};
  const responseAfterUpdate = await Product.findByIdAndUpdate(productId, newProduct, {new:true });
  return {success: true, status: 200, content: 'update success', productId: responseAfterUpdate._id};
}