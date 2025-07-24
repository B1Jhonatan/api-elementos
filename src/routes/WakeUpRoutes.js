import express from "express";
import { wakeUp } from "../controllers/WakeUpController";

const router = express.Router();

router.get("/wake-up", wakeUp);

export default router;
