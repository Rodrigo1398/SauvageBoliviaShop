"use server";

import prisma from "@/lib/prisma";

export const deleteSizeById = async (id: number) => {
  try {
    await prisma.size.delete({where: {id: id}});
    return { ok: true };
  } catch (error) {
    // En caso de error, retornar el error
    return error;
  }
};
