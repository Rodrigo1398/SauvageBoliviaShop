"use server";

import { Color } from "@/interfaces";
import prisma from "@/lib/prisma";
import { z } from "zod";

const colorSchema = z.object({
  id: z.coerce
    .number()
    .optional()
    .transform((val) => Number(val?.toFixed(0))),
  name: z.string().min(3).max(25),
});

export const createUpdateColor = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const colorParsed = colorSchema.safeParse(data);

  if (!colorParsed.success) {
    return { ok: false };
  }

  const color = colorParsed.data;

  const { id, name } = color;

  try {
    let color: Color;
    if (id) {
      color = await prisma.color.update({ where: { id }, data: { name } });
    } else {
      color = await prisma.color.create({ data: { name } });
    }

    return { ok: true, color: color };
  } catch (error) {
    return { ok: false, message: "No se pudo registrar el color" };
  }
};
