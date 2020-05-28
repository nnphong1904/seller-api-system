const express = require('express');
const router = express.Router();
const {authenticationForSeller} = require('../middleware/auth');
const {addProduct, deleteProduct, updateProduct} = require('../controllers/product');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
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
router.post('/', upload.none() ,async (req, res)=>{
  // console.log(req.file);
  // const AVATAR_URL =`http://localhost:4000/uploads/${req.file.filename}`;
  
    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET
    // })
  // const uniqueFilename = new Date().toISOString();
  // const path = req.file.path;
  // const responseAfterUploadImg = await cloudinary.uploader.upload(
  //   path,
  //   { public_id: `e-commerce-sample/${uniqueFilename}`, tags: `e-commerce-sample` }, // directory and tags are optional
  //   (err, image)=>{
  //     if (err) return res.status(400).json({responseContent: err})
  //     const fs = require('fs')
  //     fs.unlinkSync(path)
  //     // return image details
  //   }
  // )
  // const AVATAR_URL = responseAfterUploadImg.secure_url;
  // console.log(req.body)
  const product = {...req.body};
  const responseAfterAddProduct = await addProduct(product); 
  res.status(responseAfterAddProduct.status).json({responseContent: responseAfterAddProduct.content});
  // res.end();
})


router.delete('/:productId', async (req, res)=>{
  const productId = req.params.productId;
  const responseAfterDeleteProduct = await deleteProduct(productId);
  res.status(responseAfterDeleteProduct.status).json({productId:responseAfterDeleteProduct.productId});
})

router.put('/:productId', upload.none() ,async (req, res)=>{
  const productId = req.params.productId;
  const newSizesNameList = req.body.sizesName;
  const newSizesNameQuantity = req.body.sizesQuantity;
  const newProductCategory = req.body.category;
  console.log(newProductCategory);
  const responseAfterUpdate = await updateProduct(productId, newSizesNameList, newSizesNameQuantity, newProductCategory);
  res.status(responseAfterUpdate.status).json({productId: responseAfterUpdate.productId, content:responseAfterUpdate.content});
})
module.exports = router;