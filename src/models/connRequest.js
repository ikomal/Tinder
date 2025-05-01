const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema(
  {
    fromSenderid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
    },
    toReceiverid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  
  {
    timestamps: true,
  }
);
connectionReqSchema.pre("save",function(next){
  const connreq=this;
  if(connreq.fromSenderid.equals(connreq.toReceiverid)){
    throw new Error("cannot send req to self");
  }
  next();
}),

module.exports = mongoose.model("ConnectionReq", connectionReqSchema);
