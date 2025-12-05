import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController";

const router = express.Router();

// GET /products[?seller_id=...]
router.get("/", getAllProducts);

// GET /products/:id
router.get("/:id", getProductById);

export default router;