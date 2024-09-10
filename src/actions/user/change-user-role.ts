'use server';

import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';


export const changeUserRole = async( userId: string, role: string ) => {

  const session = await useSession();

  if ( session.data?.user?.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin':'user';


    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users');

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el role, revisar logs'
    }
  }



}