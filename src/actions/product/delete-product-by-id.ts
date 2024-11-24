"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductById = async (id: string) => {
  try {
    // Obtener el producto y sus imágenes asociadas
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });

    // Si no se encuentra el producto, lanzar error
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Si el producto tiene imágenes asociadas, proceder a eliminarlas
    if (product.ProductImage.length > 0) {
      const imageUrls = product.ProductImage.map((image) => image.url);

      // Extraer los public_ids de las imágenes de Cloudinary
      const imageNames = imageUrls.map(
        (image) => image.split("/").pop()?.split(".")[0] ?? ""
      );

      // Crear las promesas para eliminar las imágenes de Cloudinary en paralelo
      const deleteCloudinaryImages = imageNames.map(
        (public_id) => cloudinary.uploader.destroy(public_id) // Retorna la promesa de eliminación
      );

      // Ejecutar las promesas de eliminación de imágenes y de la base de datos en paralelo
      await Promise.all(
        deleteCloudinaryImages // Eliminar imágenes en Cloudinary
      );

      // Finalmente, eliminar el producto de la base de datos
      await prisma.product.delete({
        where: { id: id },
      });

      // Retornar un mensaje de éxito
      return { ok: true };
    } else {
      // Si no hay imágenes, solo eliminar el producto
      await prisma.product.delete({ where: { id: id } });
      return { ok: true };
    }
  } catch (error) {
    // En caso de error, retornar el error
    return error;
  }
};
