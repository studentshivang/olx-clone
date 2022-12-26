const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  seller_id:{
    type:String,
    required:true
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
},{
  timestamps:true
});

module.exports = mongoose.model("Products", productSchema);

//seller_id is taken through token
//Its actually the mongo db's implicit id 