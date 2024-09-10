"use server";

import prisma from "@/lib/prisma";

export const getColorById = async (slug: string) => {

  try {

    if(!Number(slug)){
      return null;
    }

    const id = Number(slug);

    const color = await prisma.color.findFirst({
      where: {
        id: id,
      },
    });

    if (!color) return null;

    return color;
  } catch (error) {
    throw new Error("Error al obtener color por id");
  }
};
