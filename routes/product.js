const express = require('express');
const router = express.Router();
const {authenticationForSeller} = require('../middleware/auth');
const {addProduct, deleteProduct, updateProduct} = require('../controllers/product');
const multer = require('multer');

router.get('/',  (req, res)=>{
  // console.log(req.headers.authorization)
  res.json({title:"hello product"});
})
const storageFile = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './public/uploads');
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname);
  }
})
const upload = multer({storage: storageFile});
router.post('/', upload.single('avt') ,async (req, res)=>{
  console.log(req.file);
  const AVATAR_URL =`http://localhost:4000/uploads/${req.file.filename}`;
  const product = {...req.body, avt: AVATAR_URL };
  const responseAfterAddProduct = await addProduct(product); 
  res.status(responseAfterAddProduct.status).json({responseContent: responseAfterAddProduct.content});
  // res.end();
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