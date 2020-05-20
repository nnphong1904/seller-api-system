module.exports.validateInputForAddProduct = (productInput)=>{
  const {name, price, rating, avatar, sizesName, sizesQuantity, brand, category, color} = productInput ;
  if (name === '' || price === '' || rating === '' || avatar === '' || sizesName === '' || sizesQuantity === '' || brand === '' || category === '' || color === '') {
    return false;
  }  
  return true;
} 