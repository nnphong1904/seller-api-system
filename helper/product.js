module.exports.validateInputForAddProduct = (productInput)=>{
  const {name, price, rating, avt, sizesName, sizesQuantity, brand, category, color} = productInput ;
  if (name === '' || price === '' || rating === '' || avt === '' || sizesName === '' || sizesQuantity === '' || brand === '' || category === '' || color === '') {
    return false;
  }  
  else{
    return true;
  }
} 

module.exports.validateInputForSizeInput = (sizesName, sizesQuantity)=>{
  if (sizesName === '' || sizesQuantity ===''){
    return false;
  }
  else
  {
    const lengthOfSizesName = sizesName.split(',').length;
    const lengthOfSizesQuantity = sizesQuantity.split(',').length;
    if (lengthOfSizesName !== lengthOfSizesQuantity){
      return false;
    } 
    else {
      return true
    };
  }
}

module.exports.generateSizesObject = (sizesName, sizesQuantity)=>{
  if (this.validateInputForSizeInput(sizesName, sizesQuantity) === false){
    return null;
  }
   else{ 
     const sizesNameList=sizesName.split(',');
     const sizesQuantityList=sizesQuantity.split(',');
     const newSizes = [];
      for (let i=0; i<sizesQuantityList.length; i++){
        const size={size: sizesNameList[i], noItems: parseInt(sizesQuantityList[i])};
        newSizes.push(size);
      }
    return newSizes;
  }
}