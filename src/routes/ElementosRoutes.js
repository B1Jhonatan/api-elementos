import express from "express";
import {
  createElemento,
  getElemento,
  getElementos,
} from "../controllers/ElementosController.js";

const router = express.Router();

router.post("/elemento", createElemento);
router.get("/elemento/:id", getElemento);
router.get("/elemento", getElementos);

export default router;
