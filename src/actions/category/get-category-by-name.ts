"use server";

import { Category } from "@/interfaces";
import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

export const getCatgoryByName = async (name: string) => {
  try {
    // await sleep(3);

    const category = await prisma.category.findFirst({
      where: { name },
    });

    if(!category) return null;

    return category;

  } catch (error) {
    throw new Error("La categoria no existe");
  }
};
