"use server";

import { Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { z } from "zod";

const sizeSchema = z.object({
  id: z.coerce
    .number()
    .optional()
    .transform((val) => Number(val?.toFixed(0))),
  name: z.string().min(1).max(5),
});

export const createUpdateSize = async (formData: FormData) => {

  const data = Object.fromEntries(formData);

  const sizeParsed = sizeSchema.safeParse(data);

  if (!sizeParsed.success) {
    return { ok: false };
  }

  const size = sizeParsed.data;

  const { id, name } = size;

  try {
    let size: Size;
    if (id) {
      size = await prisma.size.update({ where: { id }, data: { name } });
    } else {
      size = await prisma.size.create({ data: { name } });
    }
    return { ok: true, size: size };
  } catch (error) {
    return { ok: false, message: "No se pudo registrar la talla" };
  }
};
