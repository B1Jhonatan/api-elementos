import prisma from "../PrismaClient.js";

export const getMaterial = async (req, res) => {
  try {
    const tipos = await prisma.material.findMany();
    res.status(200).json(tipos);
  } catch (error) {
    console.error("Error al obtener los materiales:", error);
    res.status(500).json({ error: "Error al obtener los materiales" });
  }
};
