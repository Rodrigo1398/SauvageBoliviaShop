import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs';


export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) return null;

        // Comparar las contraseñas
        if(user.password){
          if (!bcryptjs.compareSync(password, user.password)) return null;
        }

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;
