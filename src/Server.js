import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./PrismaClient.js";
import ElementosRoutes from "./routes/ElementosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", ElementosRoutes);

connect();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
