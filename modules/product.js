
const mongoose = require('mongoose');
const SizesSchema = new mongoose.Schema({
    size: {type: String, required: true},
    numberOfItems: {type: Number, required: true}
})
const ProductSchema  = new mongoose.Schema({
  name:{type: String, required:true},
  price:{type: Number, required: true},
  rating:{type:Number, required:true},
  avatar:{type: String, required:true},
  brand:{type: String, required: true},
  category:{type: String, required: true},
  color: {type:String, required:true},
  decId: {type: Number, require:true},
  sizes:{type:Array, required: true},
  decId:{type: Number},
})

const Product = mongoose.model('product',ProductSchema,'product');
module.exports =  Product;