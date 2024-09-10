import { Title } from "@/components";
import { redirect } from "next/navigation";
import { getSizeById } from "@/actions";
import { SizeForm } from "./SizeForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function SizePage({params}:Props) {
  const { slug } = params;

  const size = await getSizeById(slug);

  if (!size && slug !== "new") {
    redirect("/admin/sizes");
  }

  const title = slug === "new" ? "Nueva Talla" : "Editar Talla";

  return (
    <>
      <Title title={title} />
      <SizeForm size={size ?? { id: 0, name: "" }} />
    </>
  );
}
