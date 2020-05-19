const express = require('express');
const router = express.Router();
const {addProduct} = require('../controllers/product');
router.get('/', (req, res)=>{
  res.json({title:"hello product"});
})

router.post('/', async (req, res)=>{
  const product = req.body;
  console.log(req.body);
  const responseAfterAddProduct = await addProduct(product); 
  res.status(responseAfterAddProduct.status).json({responseContent: responseAfterAddProduct.content});
  
})

module.exports = router;