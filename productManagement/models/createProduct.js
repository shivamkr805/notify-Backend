import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
},
  categoryTYpe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'category',
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  minrPrice:{
    type:Number,
    required:true,
    min:1,
  },
  imgurl:{
    type:String,
    required:true
  }
},{ timestamps: true });
const productmodels=mongoose.model('product',productSchema)
