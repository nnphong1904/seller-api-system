const express = require('express');
const router = express.Router();
const {addProduct, deleteProduct} = require('../controllers/product');
router.get('/', (req, res)=>{
  res.json({title:"hello product"});
})

router.post('/', async (req, res)=>{
  const product = req.body;
  console.log(req.body);
  const responseAfterAddProduct = await addProduct(product); 
  res.status(responseAfterAddProduct.status).json({responseContent: responseAfterAddProduct.content});
  
})

router.delete('/:productId', async (req, res)=>{
  const productId = req.params.productId;
  const responseAfterDeleteProduct = await deleteProduct(productId);
  res.status(responseAfterDeleteProduct.status).json({productId:responseAfterDeleteProduct.productId});
})

module.exports = router;