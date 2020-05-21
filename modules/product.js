
const mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
  name:{type: String, required:[true, 'fill in name of product']},
  price:{type: Number, required: [true, 'fill in price of product']},
  rating:{type:Number, required:[true, 'fill in rating of product']},
  avt:{type: String, required:[true, 'fill in avatar url of product']},
  brand:{type: String, required: [true, 'fill in product brand']},
  category:{type: Array, 
            required: true, 
            validate: [categories => categories.length >0, 'fill in product category']},
  color: {type:Array, 
          required:true,
          validate: [color=>color.length>0, 'fill in product color']},
  decId: {type: Number, required: [true, 'some thing broken in source code at route POST product']},
  sizes: {type: Array, 
          required: true, 
          validate: [(sizes)=>sizes.length > 0, 'no size for product']},
  createAt: {type: String, default: Date.now()}
})

const Product = mongoose.model('product',ProductSchema,'product');
module.exports =  Product;