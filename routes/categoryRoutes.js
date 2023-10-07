const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getSubCategories,
  createNewCategory,
  updateCategory,
} = require("../controllers/categoryControllers");

const router = Router();

router.post("/new", verifyToken, createNewCategory);
router.get("/get", getSubCategories);
router.put("/update/:id", verifyToken, updateCategory);

module.exports = router;
