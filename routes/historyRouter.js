const router = require("express").Router();
const auth = require("../middleware/auth");
const Products = require("../models/productModel");
const HistoryModel = require("../models/historyModel"); 
const userModel = require("../models/userModel");
router.post("/history", auth, async (req, res) => {
  const { product_id, customer_id } = req.body;
  const seller_id = req.user.id;
  // console.log(seller_id);
  if (!seller_id) return res
      .status(400)
      .json({ success: false, msg: "Please Login Or Register!" });

  //To check if product_id is correct
  const product_document = await Products.findOne({ product_id: product_id.toLowerCase() });
  if (!product_document)
    return res
      .status(400)
      .json({ success: false, msg: "Enter a valid product id!" });
  if (product_document.sold === true)
    return res
      .status(400)
      .json({ success: false, msg: "Product is already sold!" });

  //To get the seller details
  const seller = await userModel.findOne({ _id: seller_id }, "-password");
  if (!seller)
    return res.status(400).json({ success: false, msg: "Invalid operation!" });

  if (seller.user_id === customer_id.toLowerCase())
    return res
      .status(400)
      .json({ success: false, msg: "Can't purchase own product!" });

  //To check if customer_id is valid
  const customer = await userModel.findOne(
    { user_id: customer_id.toLowerCase() },
    "-password"
  );
  if (!customer)
    return res
      .status(400)
      .json({ success: false, msg: "Enter a valid customer id!" });

  //To check if user is authorized to change status from sold to unsold
  if (seller_id !== product_document.seller_id)
    return res
      .status(400)
      .json({ success: false, msg: "User not authorized access!" });

  const data = await Products.findOneAndUpdate(
    { product_id: product_id.toLowerCase() },
    { $set: { sold: true } },
    { new: true }
  );
  if (!data)
    return res
      .status(400)
      .json({ success: false, msg: "Sold status not changed!" });

  //   console.log(data);
  //   console.log(product_document, customer_id, seller_id);
  const history = HistoryModel({
    sale_id: `${product_id.toLowerCase()}-${customer_id.toLowerCase()}-${seller.user_id}`,
    customer: { ...customer },
    product: { ...product_document },
    seller: { ...seller },
  });
  await history.save();
  return res.status(200).json({ success: true, msg: "History saved" });
});

module.exports = router;
