const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getSubCategories,
  createNewCategory,
} = require("../controllers/categoryControllers");

const router = Router();

router.post("/new", verifyToken, createNewCategory);
router.get("/get", getSubCategories);

module.exports = router;
