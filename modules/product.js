
const mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
  name:{type: String, required:true},
  price:{type: Number, required: true},
  rating:{type:Number, required:true},
  avt:{type: String, required:true},
  brand:{type: String, required: true},
  category:{type: String, required: true},
  color: {type:String, required:true},
  decId: {type: Number, require:true},
  sizes: {type: Array, required: true},
  decId:{type: Number, required:true},
})

const Product = mongoose.model('product',ProductSchema,'product');
module.exports =  Product;