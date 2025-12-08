import { Router } from "express";
import { addReview, getReviewsByProduct } from "../controllers/reviewController";

const router = Router();

router.post("/", addReview);

router.get("/:id", getReviewsByProduct);

export default router;
