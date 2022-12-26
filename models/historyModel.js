const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  sale_id:{
    type: String,
    unique:true,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  seller:{
    type: Object,
    required: true,
  },
  customer:{
    type: Object,
    required: true,
  }
},{
  timestamps:true
})

module.exports = mongoose.model("history", historySchema);

// customer's user_id is given by seller at the time of confirming a sale
//then its ObjectID() is extracted from database and stored in customer_id
//seller_id is taken through token