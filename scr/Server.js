import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./PrismaClient.js";

const app = express();

app.use(cors());
app.use(express.json());

connect();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
