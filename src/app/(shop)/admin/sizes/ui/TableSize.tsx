"use client";

import { deleteSizeById } from "@/actions";
import { Size } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";

interface Props {
  sizes: Size[];
}
export const TableSize = ({ sizes }: Props) => {
  const [sizesList, setSizeList] = useState(sizes);
  const onDeleteSize = async (id: number) => {
    const updatedProducts = sizesList.filter((size) => size.id !== id);
    setSizeList(updatedProducts);

    try {
      const resp = await deleteSizeById(id);
      if (resp) {
        // Aquí podrías agregar una notificación o mensaje de éxito
        return null;
      } else {
        setSizeList(sizes); // Revertimos el estado de los productos
      }
    } catch (error) {
      setSizeList(sizes);
    }
  };

  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            SKU
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Talla
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
        {sizesList.map((size) => (
          <tr
            key={size.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {size.id}
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              <Link href={`/admin/size/${size.id}`} className="hover:underline">
                {size.name}
              </Link>
            </td>
            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              <button
                type="button"
                className="rounded-full group-hover:opacity-100 transition-opacity"
                onClick={() => onDeleteSize(size.id)}
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
  );
};
