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
import { Category, Gender } from "@prisma/client";
import { StockSizeColor } from "./StockSizeColor";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

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
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  };

  const onSubmit = async (data: FormInputs) => {
    setIsUploading(true);
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append(
      "productcolorsize",
      JSON.stringify(productToSave.productColorSizeStock)
    );
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
    setIsUploading(false);
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
          {/* <input
            type="file"
            {...register("images")}
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg, image/avif"
          /> */}
          <div
            className={clsx(
              "relative border-2 border-dashed rounded-lg p-8 text-center",
              "transition-colors duration-200 ease-in-out",
              isDragging ? "border-primary bg-primary/5" : "border-gray-300",
              isUploading && "opacity-50 pointer-events-none"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              {...register("images", {
                required: "Por favor, selecciona al menos una imagen",
              })}
              onChange={handleImageChange}
            />

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 8h.01" />
                  <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                  <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
                  <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 animate-spin"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3a9 9 0 1 0 9 9" />
                      </svg>
                      Subiendo archivos...
                    </span>
                  ) : (
                    "Subir imágenes"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Arrastra y suelta o haz clic para seleccionar
                </p>
              </div>
            </div>
          </div>
          {previews.length > 0 && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {previews.map((preview, index) => (
                  <Image
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={500}
                    height={500}
                    priority={true}
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}
          <button className="btn-primary w-full mt-5" disabled={isUploading}>
            {isUploading ? "Guardando..." : "Guardar"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          {product.ProductImage?.map((image) => (
            <div key={image.id} className="relative group">
              <Image
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                priority={true}
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                // className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                className="absolute z-10 top-[-10px] right-[-10px] bg-red-600 rounded-full text-white p-1 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteProductImage(image.id, image.url)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
              {/* <button
                type="button"
                onClick={() => deleteProductImage(image.id, image.url)}
                className="btn-danger w-full rounded-b-xl"
              >
                Eliminar
              </button> */}
            </div>
          ))}
        </div>
      </div>

      {/* </div> */}
    </form>
  );
};
