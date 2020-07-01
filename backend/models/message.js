const mongoose = require("mongoose");
// Mongoose is an Object Data Modeling (ODM) 
const MessageSchema = mongoose.Schema({
  from:{
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  seen:{
      type: Boolean
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

// export model user with MessageSchema
module.exports = mongoose.model("message", MessageSchema);