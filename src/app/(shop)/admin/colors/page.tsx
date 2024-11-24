export const revalidate = 0;

import { getAllColorsPagination } from "@/actions";
import { Pagination, Title } from "@/components";
import Link from "next/link";
import { TableColors } from "./ui/TableColors";

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
        <TableColors colors={colors}/>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
