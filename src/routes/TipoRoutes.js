import express from "express";
import { getTiposElementos, getTipos } from "../controllers/TipoController.js";

const router = express.Router();

router.get("/tipos", getTipos);
router.get("/tipos-elementos", getTiposElementos);

export default router;
