import express from "express";
import { getSellerById, getAllSellers, getSellerDashboard } from "../controllers/sellerController";

const router = express.Router();

router.get("/", getAllSellers);

router.get("/:id", getSellerById);

router.get("/:id/dashboard", getSellerDashboard);


export default router;