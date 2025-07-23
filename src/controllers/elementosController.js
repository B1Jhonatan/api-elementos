import prisma from "../PrismaClient.js";

export const getElemento = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const findElemento = await prisma.elemento.findUnique({
      where: { id },
      include: {
        medidas: true,
        areas: true,
        material: true,
        tipo: true,
      },
    });

    if (!findElemento) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }

    res.status(200).json(findElemento);
  } catch (error) {
    console.error("Elemento no encontrado:", error);
    res.status(500).json({ error: "Elemento no encontrado" });
  }
};

export const createElemento = async (req, res) => {
  try {
    const { elemento, cantidad, tipoId, medidas, areas, material } = req.body;

    const nuevoElemento = await prisma.elemento.create({
      data: {
        elemento,
        cantidad,
        tipoId,
        medidas: medidas ? { create: medidas } : undefined,
        areas: areas ? { create: areas } : undefined,
        material: material ? { create: material } : undefined,
      },
      include: {
        medidas: true,
        areas: true,
        material: true,
        tipo: true,
      },
    });

    res.status(201).json(nuevoElemento);
  } catch (error) {
    console.error("Error al crear el elemento:", error);
    res.status(500).json({ error: "Error al crear el elemento" });
  }
};

export const getElementos = async (req, res) => {
  try {
    const tiposConElementos = await prisma.tipo.findMany({
      include: {
        elemento: {
          include: {
            medidas: true,
            areas: true,
            material: true,
          },
        },
      },
    });

    res.status(200).json(tiposConElementos);
  } catch (error) {
    console.error("Error al obtener los tipos con elementos:", error);
    res.status(500).json({ error: "Error al obtener los elementos" });
  }
};

export const updateElemento = async (req, res) => {};

export const deleteElemento = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deleteElemento = await prisma.elemento.delete({
      where: { id },
    });

    if (!deleteElemento) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }

    res.status(200).json(deleteElemento);
  } catch (error) {
    console.error("Elemento no encontrado:", error);
    res.status(500).json({ error: "Elemento no encontrado" });
  }
};
