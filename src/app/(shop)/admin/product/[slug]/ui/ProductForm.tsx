"use client";

import { useForm } from "react-hook-form";
import {
  Color,
  Product,
  ProductColorSize,
  ProductImage as ProductWithImage,
  Size,
} from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { Category, Gender } from "@prisma/client";
import { StockSizeColor } from "./StockSizeColor";


interface Props {
  product: Partial<Product> & {
    ProductImage?: ProductWithImage[];
  };
  sizes: Size[];
  colors: Color[];
  productColorSize: ProductColorSize[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  productcolorsize: ProductColorSize[];
  tags: string;
  gender: Gender;
  category: Category;
  productColorSizeStock: {
    colorId: number;
    sizeId: number;
    stock: number;
    price: number;
  }[];
  images?: FileList;
}

export const ProductForm = ({
  product,
  productColorSize,
  sizes,
  colors,
}: Props) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      productColorSizeStock:
        productColorSize.length > 0
          ? productColorSize
          : [{ colorId: 0, sizeId: 0, stock: 0, price: 0 }],
      images: undefined,
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   name: "productColorSizeStock",
  //   control,
  // });
  
  const onSubmit = async (data: FormInputs) => {

    const formData = new FormData();
    
    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("productcolorsize", JSON.stringify(productToSave.productColorSizeStock));
    formData.append("tags", productToSave.tags);
    formData.append("category", productToSave.category);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Genero</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="sex_shop">Shex Shop</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("category", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="Boxers">Boxers</option>
            <option value="Soutiens">Soutiens</option>
            <option value="Bodys">Bodys</option>
            <option value="Corseteria">Corseteria</option>
            <option value="Bombachas">Bombachas</option>
            <option value="Portaligas">Portaligas</option>
            <option value="Bikinis_Swinwear">Bikinis Swinwear</option>
            <option value="Pijamas_Homewear">Pijamas Homewear</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Para_ellos">Para ellos</option>
            <option value="Para_ellas">Para ellas</option>
            <option value="Pugs">Pugs</option>
            <option value="Disfraces">Disfraces</option>
            <option value="Lubricantes">Lubricantes</option>
            <option value="Juegos">Juegos</option>
          </select>
        </div>
      </div>

      {/* As checkboxes */}
      <div className="flex flex-col">
        <StockSizeColor
          sizes={sizes}
          colors={colors}
          control={control}
          register={register}
          setValue={setValue}
          productColorSIzeStock={productColorSize}
          productId={product.id}
        />

        <div className="flex flex-col mb-2">
          <span>Fotos</span>
          <input
            type="file"
            {...register("images")}
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg, image/avif"
          />
        </div>
        <button className="btn-primary w-full">Guardar</button>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product.ProductImage?.map((image) => (
            <div key={image.id}>
              <ProductImage
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                className="rounded-t shadow-md"
              />

              <button
                type="button"
                onClick={() => deleteProductImage(image.id, image.url)}
                className="btn-danger w-full rounded-b-xl"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* </div> */}
    </form>
  );
};
