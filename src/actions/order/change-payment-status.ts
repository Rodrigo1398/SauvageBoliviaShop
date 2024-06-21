'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const changePaymentStatus = async( orderId: string, status: boolean ) => {

  try {

    const isPaid = status === false ? true:false;


    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: isPaid
      }
    })

    revalidatePath('/admin/orders');

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el estado, revisar logs'
    }
  }



}