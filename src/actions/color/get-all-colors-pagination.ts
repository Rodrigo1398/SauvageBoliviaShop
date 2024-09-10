"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAllColorsPagination = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const colors = await prisma.color.findMany({
      take: take,
      skip: (page - 1) * take,
    });
    const totalColors = await prisma.color.count();
    const totalPages = Math.ceil(totalColors / take);
    return {
      colors: colors,
      currentPage: page,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los colores");
  }
};
