module.exports.validateInputForAddProduct = (productInput)=>{
  const {name, price, rating, avt, sizesName, sizesQuantity, brand, category, color} = productInput ;
  if (name === '' || price === '' || rating === '' || avt === '' || sizesName === '' || sizesQuantity === '' || brand === '' || category === '' || color === '') {
    return false;
  }  
  const lengthOfSizesName = sizesName.split(',').length;
  const lengthOfSizesQuantity = sizesQuantity.split(',').length;
  if (lengthOfSizesName !== lengthOfSizesQuantity){
    return false;
  } 
  return true;
} 