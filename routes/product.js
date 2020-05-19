const express = require('express');
const router = express.Router();
const {addProduct} = require('../controllers/product');
router.get('/', (req, res)=>{
  res.json({title:"hello product"});
})

router.post('/', (req, res)=>{
  const product = req.body;
  addProduct(product);
  res.end();
})

module.exports = router;