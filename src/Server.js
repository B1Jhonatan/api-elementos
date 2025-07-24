import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./PrismaClient.js";
import ElementosRoutes from "./routes/ElementosRoutes.js";
import TiposRoutes from "./routes/TipoRoutes.js";
import WakeUpRoutes from "./routes/WakeUpRoutes.js";
import MaterialesRoutes from "./routes/MaterialesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", ElementosRoutes, TiposRoutes, MaterialesRoutes, WakeUpRoutes);

connect();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
