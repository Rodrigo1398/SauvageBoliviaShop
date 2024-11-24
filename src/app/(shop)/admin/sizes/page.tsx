export const revalidate = 0;

import { getAllSizesPagination } from "@/actions";
import { Pagination, Title } from "@/components";
import Link from "next/link";
import { TableSize } from "./ui/TableSize";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function SizesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { totalPages, currentPage, sizes } = await getAllSizesPagination({
    page,
  });

  return (
    <>
      <Title title="Mantenimiento de Tallas" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/size/new" className="btn-primary">
          Nueva Talla
        </Link>
      </div>
      <div className="mb-10">
        <TableSize sizes={sizes}/>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
