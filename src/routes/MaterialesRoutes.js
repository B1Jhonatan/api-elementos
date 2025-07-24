import express from "express";
import { getMaterial } from "../controllers/MaterialesController";

const router = express.Router();

router.get("/materieles", getMaterial);

export default router;
