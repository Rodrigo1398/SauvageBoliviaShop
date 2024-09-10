'use server';

import prisma from "@/lib/prisma";

export const getAllColors = async () =>{
    try {
        const colors = await prisma.color.findMany();
        return colors;
    } catch (error) {
        throw new Error('Error al cargar los colores');
    }
};