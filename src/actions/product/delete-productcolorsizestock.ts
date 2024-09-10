"use server";

import prisma from "@/lib/prisma";

export const deleteProductColorSizeStock = async (
  productId: string,
  colorId: number,
  sizeId: number
) => {
  try {
    await prisma.productColorSizeStock.delete({
      where: {
        productId_colorId_sizeId: {
          productId,
          colorId,
          sizeId,
        },
      },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
};
