import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
   message: {
    type: String,
    require: true,
    minlength: 1,
  },
  senderId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    require :true,
  },
  receiverID :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    require :true,
  },
},{timestamps : true});

const Msg = mongoose.model("Msg", msgSchema);

export default Msg;
