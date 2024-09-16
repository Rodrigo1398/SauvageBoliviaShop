export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { TableProducsMobile } from "./ui/TableProducsMobile";
import { TableProducts } from "./ui/TableProducts";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <TableProducsMobile products={products} />
        <TableProducts products={products} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
