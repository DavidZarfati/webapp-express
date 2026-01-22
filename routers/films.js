import express from "express";
import { index, show, storeReview } from "../controllers/filmController.js";


const router = express.Router();


// INDEX
router.get("/", index);

// SHOW
router.get("/:id", show);

// STORE REVIEW
router.post("/:id/reviews", storeReview);


export default router;