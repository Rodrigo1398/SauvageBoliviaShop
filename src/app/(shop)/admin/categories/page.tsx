export const revalidate = 0;

import { getPaginationCategories } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function CategoriesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { categories,totalPages } = await getPaginationCategories({ page });

  return (
    <>
      <Title title="Mantenimiento de categrias" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/category/new" className="btn-primary">
          Nueva categoria
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
                Categorias
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {category.name}
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
