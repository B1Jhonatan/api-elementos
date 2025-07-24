import { empty } from "@prisma/client/runtime/library";
import prisma from "../PrismaClient.js";

export const getElemento = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (id === 0 || id <= 0) {
      return res.status(400).json({ mensaje: "No puede ser menor a cero" });
    }

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

    if (
      elemento === "" ||
      cantidad === 0 ||
      tipoId === 0 ||
      !Array.isArray(medidas) ||
      medidas.length === 0 ||
      !Array.isArray(areas) ||
      areas.length === 0 ||
      !Array.isArray(material) ||
      material.length === 0
    ) {
      return res.status(400).json({ mensaje: "No puede haber valores vacios" });
    }

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

export const updateElemento = async (req, res) => {
  const id = Number(req.params.id);
  const { elemento, cantidad, tipoId, medidas, areas, material } = req.body;

  if (id === 0 || id <= 0) {
    return res.status(400).json({ mensaje: "No puede ser menor a cero" });
  }

  if (
    elemento === "" ||
    cantidad === 0 ||
    tipoId === 0 ||
    !Array.isArray(medidas) ||
    medidas.length === 0 ||
    !Array.isArray(areas) ||
    areas.length === 0 ||
    !Array.isArray(material) ||
    material.length === 0
  ) {
    return res.status(400).json({ mensaje: "No puede haber valores vacios" });
  }

  try {
    const updatedElemento = await prisma.elemento.update({
      where: { id },
      data: {
        elemento,
        cantidad,
        tipoId,

        medidas: medidas
          ? {
              deleteMany: {},
              create: medidas,
            }
          : undefined,
        areas: areas
          ? {
              deleteMany: {},
              create: areas,
            }
          : undefined,
        material: material
          ? {
              deleteMany: {},
              create: material,
            }
          : undefined,
      },
      include: {
        medidas: true,
        areas: true,
        material: true,
        tipo: true,
      },
    });

    res.status(200).json(updatedElemento);
  } catch (error) {
    console.error("Error updating elemento:", error);
    res.status(500).json({ error: "Error updating elemento" });
  }
};

export const deleteElemento = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (id === 0 || id <= 0) {
      return res.status(400).json({ mensaje: "No puede ser menor a cero" });
    }

    await prisma.medidas.deleteMany({ where: { elementoId: id } });
    await prisma.areas.deleteMany({ where: { elementoId: id } });
    await prisma.material.deleteMany({ where: { elementoId: id } });

    const deleteElemento = await prisma.elemento.delete({
      where: { id },
    });

    if (!deleteElemento) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }

    res.status(200).json({ mensaje: "Elemento borrado" });
  } catch (error) {
    console.error("Elemento no encontrado:", error);
    res.status(500).json({ error: "Elemento no encontrado" });
  }
};
