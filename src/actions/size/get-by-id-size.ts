"use server";

import prisma from "@/lib/prisma";

export const getSizeById = async (slug: string) => {

  try {

    if(!Number(slug)){
      return null;
    }

    const id = Number(slug);

    const size = await prisma.size.findFirst({
      where: {
        id: id,
      },
    });

    if (!size) return null;

    return size;
  } catch (error) {
    throw new Error("Error al obtener talla por id");
  }
};
