"use client";

import { deleteProductById } from "@/actions";
import { ProductImage } from "@/components";
import { ProductAdmin } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useState } from "react";

interface Props {
  products: ProductAdmin[];
}

export const TableProducts = ({ products }: Props) => {
  const [productList, setProductList] = useState(products); // Usamos el estado para manejar los productos

  const onDeleteProduct = async (id: string) => {
    // Eliminar localmente el producto de la lista antes de hacer la petición al servidor
    const updatedProducts = productList.filter((product) => product.id !== id);
    setProductList(updatedProducts);

    try {
      // Llamamos a la acción para eliminar el producto del servidor
      const resp = await deleteProductById(id);
      if (resp) {
        // Aquí podrías agregar una notificación o mensaje de éxito
        return null;
      } else {
        setProductList(products); // Revertimos el estado de los productos
      }
    } catch (error) {
      setProductList(products);
    }
  };

  return (
    <div className="hidden md:block">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Imagen
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Titulo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Precio
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Género
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Inventario
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Tallas
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/product/${product.slug}`}>
                  <ProductImage
                    src={product.ProductImage[0]?.url}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/product/${product.slug}`}
                  className="hover:underline"
                >
                  {product.title}
                </Link>
              </td>
              {/* <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
                {product.ProductColorSizeStock.map(
                  (obj) => `${currencyFormat(obj.price)}`
                ).join(" - ")}
              </td> */}
              <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
                {product.ProductColorSizeStock[0].price}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.gender}
              </td>

              <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {/* {product.ProductColorSizeStock.map(obj=>`${obj.stock}`).join(' - ')} */}
                {product.ProductColorSizeStock.reduce(
                  (total, obj) => total + obj.stock,
                  0
                )}
              </td>

              <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {product.ProductColorSizeStock[0].size.name}
              </td>
              <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                <button
                  type="button"
                  className="rounded-full group-hover:opacity-100 transition-opacity"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
