import express from "express";
import { wakeUp } from "../controllers/WakeUpController.js";

const router = express.Router();

router.get("/wake-up", wakeUp);

export default router;
