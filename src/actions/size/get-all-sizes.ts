"use server";

import prisma from "@/lib/prisma";

export const getAllSizes = async () => {
  try {
    const sizes = await prisma.size.findMany();
    return sizes;
  } catch (error) {
    throw new Error("No se pudo cargar las tallas");
  }
};
