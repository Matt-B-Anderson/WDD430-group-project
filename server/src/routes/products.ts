import { Router } from "express";
import {
	getFilteredProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getFilteredProducts);
router.get("/:id", getProductById);

// These are for sellers
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
