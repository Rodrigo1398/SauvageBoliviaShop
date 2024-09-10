"use server";
import prisma from "@/lib/prisma";

import type { Address, Color, Size } from "@/interfaces";
import { auth } from "@/auth";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
  color: Color;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user?.id

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }
  // Obtener la información de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
  const productsDB = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
    include: {
      ProductColorSizeStock: {
        where: {
          OR: productIds.map((item) => ({
            AND: [
              { productId: item.productId },
              { colorId: item.color.id },
              { sizeId: item.size.id },
            ],
          })),
        },
      },
    },
  });

  //Transformar en objetos separados
  const products = productsDB.flatMap((product) => {
    return product.ProductColorSizeStock.map((stock) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      slug: product.slug,
      tags: product.tags,
      gender: product.gender,
      category: product.category,
      ProductColorSizeStock: stock,
    }));
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  // Los totales de tax, subtotal, y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      // const productQuantity = item.quantity;
      const product = products.find(
        (product) =>
          product.id === item.productId &&
          product.ProductColorSizeStock.sizeId === item.size.id &&
          product.ProductColorSizeStock.colorId === item.color.id
      );

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const productQuantity = item.quantity;
      const subTotal = product.ProductColorSizeStock.price * productQuantity;

      // const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter(
            (p) =>
              p.productId === product.id &&
              p.size.id === product.ProductColorSizeStock.sizeId &&
              p.color.id === product.ProductColorSizeStock.colorId
          )
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        // Iterar sobre ProductColorSizeStock
        return tx.productColorSizeStock.update({
          where: {
            productId_colorId_sizeId: {
              productId: product.id,
              colorId: product.ProductColorSizeStock.colorId, // Usando el colorId del objeto actual
              sizeId: product.ProductColorSizeStock.sizeId, // Usando el sizeId del objeto actual
            },
          },
          data: {
            stock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.stock < 0) {
          const p = products.find((p)=>p.id===product.productId);
          throw new Error(
            `${p?.title} no tiene inventario suficiente`
          );
        }
      });
      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                sizeId: p.size.id,
                colorId: p.color.id,
                productId: p.productId,
                price:
                  products.find(
                    (product) =>
                      product.id === p.productId &&
                      product.ProductColorSizeStock.sizeId === p.size.id &&
                      product.ProductColorSizeStock.colorId === p.color.id
                  )?.ProductColorSizeStock.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error
      // 3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
