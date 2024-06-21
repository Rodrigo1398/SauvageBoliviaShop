"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginationCategories = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    const categories = await prisma.category.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        name: "asc",
      },
    });

    const totalCount = await prisma.category.count();

    const totalPages = Math.ceil(totalCount / take);

    return { categories, totalPages };

  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar las categorias");
  }
};