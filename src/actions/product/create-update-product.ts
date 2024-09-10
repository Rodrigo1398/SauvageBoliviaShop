"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender, Category, Product } from "@prisma/client";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productColorSizeSchema = z.object({
  productId: z.string().uuid().optional(),
  colorId: z.number(), // Ajusta según el tipo real de colorId
  sizeId: z.number(), // Ajusta según el tipo real de sizeId
  stock: z.number().int().positive(), // Ajusta según el tipo real de stock
  price: z.number().positive(), // Ajusta según el tipo real de price
});

const arrayOfProductColorSizeSchema = z.array(productColorSizeSchema);

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  category: z.nativeEnum(Category),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {

  const datos = JSON.parse(formData.get("productcolorsize") as string);
  formData.delete("productcolorsize");
  const datas = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(datas);
  const datosParsed = arrayOfProductColorSizeSchema.safeParse(datos);

  if (!productParsed.success || !datosParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;

  const productColorSizeStock = datosParsed.data;

  // product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            tags: {
              set: tagsArray,
            },
          },
        });

        await Promise.all(
          productColorSizeStock.map((update) =>
            prisma.productColorSizeStock.upsert({
              where: {
                productId_colorId_sizeId: {
                  productId: id,
                  colorId: update.colorId,
                  sizeId: update.sizeId,
                },
              },
              update: {
                stock: update.stock,
                price: update.price,
              },
              create: {
                productId: id,
                colorId: update.colorId,
                sizeId: update.sizeId,
                stock: update.stock,
                price: update.price,
              },
            })
          )
        );
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            tags: {
              set: tagsArray,
            },
          },
        });

        const updatedProductColorSizeStock = productColorSizeStock.map(
          (pcss) => ({
            ...pcss,
            productId: product.id,
          })
        );

        await prisma.productColorSizeStock.createMany({
          data: updatedProductColorSizeStock,
        });
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas

      if (formData.getAll("images")) {
        // [https://url.jpg, https://url.jpg]
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("No se pudo cargar las imágenes, rollingback");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar/crear",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`,{format:'webp'})
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    return null;
  }
};
