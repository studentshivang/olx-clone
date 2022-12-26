const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.post("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

//To get seller description (from seller id (present in productDetails))
router.get("/infor/:id", userCtrl.getUserById);
// router.patch("/addcart", auth, userCtrl.addCart);

router.get("/orders", auth, userCtrl.orders);
router.get("/sales", auth, userCtrl.sales);

module.exports = router;
