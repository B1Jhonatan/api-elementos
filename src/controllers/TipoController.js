import prisma from "../PrismaClient.js";

export const getTiposElementos = async (req, res) => {
  try {
    const tiposConElementos = await prisma.elemento.findMany({
      include: {
        medidas: true,
        areas: true,
        material: true,
        tipo: true,
      },
    });

    res.status(200).json(tiposConElementos);
  } catch (error) {
    console.error("Error al obtener los tipos con elementos:", error);
    res.status(500).json({ error: "Error al obtener los elementos" });
  }
};

export const getTipos = async (req, res) => {
  try {
    const tipos = await prisma.tipo.findMany();
    res.status(200).json(tipos);
  } catch (error) {
    console.error("Error al obtener los tipos con elementos:", error);
    res.status(500).json({ error: "Error al obtener los elementos" });
  }
};
