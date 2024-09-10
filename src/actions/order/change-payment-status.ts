'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const changePaymentStatus = async( orderId: string, status: boolean ) => {

  try {

    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: status
      }
    })

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true
    }
    
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo actualizar el estado, revisar logs'
    }
  }

}