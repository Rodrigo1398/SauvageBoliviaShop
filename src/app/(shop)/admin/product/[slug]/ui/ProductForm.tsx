"use client";

import { useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Product,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { Category, Gender } from "@prisma/client";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Rojo", "Negro", "Gris", "Morado", "Amarillo", "Verde"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  colors: string[];
  tags: string;
  gender: Gender;
  category: Category;
  images?: FileList;
}

export const ProductForm = ({ product }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      colors: product.colors ?? [],
      images: undefined,
    },
  });

  watch("sizes");
  watch("colors");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onColorChanged = (color: string) => {
    const colors = new Set(getValues("colors"));
    colors.has(color) ? colors.delete(color) : colors.add(color);
    setValue("colors", Array.from(colors));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("colors", productToSave.colors.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.category);
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
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
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
            <option value="men">Boxers</option>
            <option value="Soutiens">Soutiens</option>
            <option value="Bodys">Bodys</option>
            <option value="Corseteria">Corseteria</option>
            <option value="Bombachas">Bombachas</option>
            <option value="Portaligas">Portaligas</option>
            <option value="Bikinis_Swinwearisex">Bikinis Swinwear</option>
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

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <span>Colores</span>
            <Select
              label="Seleccion"
              selectionMode="multiple"
              placeholder="No seleccionado"
              selectedKeys={getValues("colors")}
              // onSelectionChange={setValues}
            >
              {colors.map((color) => (
                <SelectItem
                  key={color}
                  value={color}
                  onClick={() => onColorChanged(color)}
                >
                  {color}
                </SelectItem>
              ))}
            </Select>
          </div>

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
      </div>
    </form>
  );
};
