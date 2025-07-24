import express from "express";
import {
  createElemento,
  getElemento,
  updateElemento,
  deleteElemento,
} from "../controllers/elementosController.js";

const router = express.Router();

router.post("/elemento", createElemento);
router.get("/elemento/:id", getElemento);
router.put("/elemento/:id", updateElemento);
router.delete("/elemento/:id", deleteElemento);

export default router;
