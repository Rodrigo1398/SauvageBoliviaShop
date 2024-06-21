'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Category } from '@prisma/client';
import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );



const categorySchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(5).max(50),
});


export const createUpdateCategory = async( formData: FormData ) => {

  const data = Object.fromEntries( formData );
  const categoryParsed = categorySchema.safeParse( data );

  if ( !categoryParsed.success) {
    console.log( categoryParsed.error );
    return { ok: false }
  }

  const category = categoryParsed.data;


  const { id, ...rest } = category;

  try {
    const prismaTx = await prisma.$transaction( async (tx) => {
  
      let category: Category;
  
      if ( id ) {
        // Actualizar
        category = await prisma.category.update({
          where: { id },
          data: {
            ...rest,
          }
        });
  
      } else {
        // Crear
        category = await prisma.category.create({
          data: {
            ...rest,
          }
        })
      }
      
      return {
        category
      }
    });

    // Todo: RevalidatePaths
    revalidatePath('/admin/categories');
    // revalidatePath(`/admin/category/${ category.name }`);

    return {
      ok: true,
      category: prismaTx.category,
    }

  } catch (error) {
    
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    }
  }

}