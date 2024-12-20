"use server";

import prisma from "@/lib/prisma";

export const deleteColorById = async (id: number) => {
  try {
    await prisma.color.delete({where: {id: id}});
    return { ok: true };
  } catch (error) {
    // En caso de error, retornar el error
    return error;
  }
};