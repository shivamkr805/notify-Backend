import mongoose from "mongoose";

const signSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true,
    maxlength: 50, // Maximum length of 50 characters
  },
  userType:{
    type:String,
    enum: ['admin', 'seller', 'consumer'],
    default:'consumer',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  

},{ timestamps: true });
const signupModels = mongoose.model("user", signSchema);
export default signupModels;
