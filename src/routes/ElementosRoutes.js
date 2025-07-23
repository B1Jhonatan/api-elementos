import express from "express";
import {
  createElemento,
  getElemento,
} from "../controllers/ElementosController.js";

const router = express.Router();

router.post("/elemento", createElemento);
router.get("/elemento/:id", getElemento);

export default router;
