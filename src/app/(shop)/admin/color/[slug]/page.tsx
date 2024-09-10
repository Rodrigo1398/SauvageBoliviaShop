import { getColorById } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ColorForm } from "./ui/ColorForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ColorPage({ params }: Props) {
    
  const { slug } = params;

  const color = await getColorById(slug);

  if (!color && slug !== "new") {
    redirect("/admin/colors");
  }

  const title = slug === "new" ? "Nuevo color" : "Editar color";
  
  return (
    <>
      <Title title={title} />
      <ColorForm color={ color ?? {id:0,name:''} } />
    </>
  );

}
