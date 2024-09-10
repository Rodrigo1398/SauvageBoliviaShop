"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAllSizesPagination = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const sizes = await prisma.size.findMany({
      take: take,
      skip: (page - 1) * take,
    });
    const totalSizes = await prisma.size.count();
    const totalPages = Math.ceil(totalSizes / take);
    return {
      sizes: sizes,
      currentPage: page,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error("No se pudo cargar las tallas");
  }
};
