import { getAllColors, getAllSizes, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;

  const product = await getProductBySlug(slug);

  const sizes = await getAllSizes();

  const colors = await getAllColors();

  // Todo: new
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />

      <ProductForm
        product={product ?? {}}
        productColorSize={product?.ProductColorSizeStock ?? []}
        sizes={sizes}
        colors={colors}
      />
    </>
  );
}
