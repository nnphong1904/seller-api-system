const express = require('express');
const router = express.Router();
const {addProduct, deleteProduct, updateProduct} = require('../controllers/product');
router.get('/', (req, res)=>{
  res.json({title:"hello product"});
})

router.post('/', async (req, res)=>{
  const product = req.body;
  const responseAfterAddProduct = await addProduct(product); 
  res.status(responseAfterAddProduct.status).json({responseContent: responseAfterAddProduct.content});
  
})

router.delete('/:productId', async (req, res)=>{
  const productId = req.params.productId;
  const responseAfterDeleteProduct = await deleteProduct(productId);
  res.status(responseAfterDeleteProduct.status).json({productId:responseAfterDeleteProduct.productId});
})

router.put('/:productId', async (req, res)=>{
  const productId = req.params.productId;
  const newSizesNameList = req.body.sizesName;
  const newSizesNameQuantity = req.body.sizesQuantity;
  const responseAfterUpdate = await updateProduct(productId, newSizesNameList, newSizesNameQuantity);
  console.log(responseAfterUpdate);
  res.status(responseAfterUpdate.status).json({productId: responseAfterUpdate.productId, content:responseAfterUpdate.content});
})
module.exports = router;