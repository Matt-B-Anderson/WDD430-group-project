import express from "express";
import { getSellerById, getAllSellers } from "../controllers/sellerController";

const router = express.Router();

router.get("/", getAllSellers);

router.get("/:id", getSellerById);

export default router;