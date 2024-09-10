export const revalidate = 0;

import { getAllColorsPagination } from "@/actions";
import { Pagination, Title } from "@/components";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ColorsPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { totalPages, currentPage,colors} = await getAllColorsPagination({page});

  return (
    <>
      <Title title="Mantenimiento de Colores" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/color/new" className="btn-primary">
          Nuevo Color
        </Link>
      </div>

      <div className="mb-10">
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
                Color
              </th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <tr
                key={color.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {color.id}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                <Link
                    href={`/admin/color/${color.id}`}
                    className="hover:underline"
                  >
                    {color.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
