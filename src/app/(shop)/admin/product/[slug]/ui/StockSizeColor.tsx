"use client";

import { deleteProductColorSizeStock } from "@/actions";
import { Color, ProductColorSize, Size } from "@/interfaces";
import { Category, Gender } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

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
  discount: number|null;
  images?: FileList;
}

interface Props {
  sizes: Size[];
  productColorSIzeStock: ProductColorSize[];
  colors: Color[];
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  productId?: string;
}

export const StockSizeColor = ({
  sizes,
  colors,
  control,
  register,
  setValue,
  productColorSIzeStock,
  productId = "0",
}: Props) => {

  const { fields, append, remove } = useFieldArray({
    name: "productColorSizeStock",
    control,
  });

  const [select, setSelect] = useState<ProductColorSize[]>(
    productColorSIzeStock
  );

  const sizeChanged = (index: number, sizeId: number) => {
    setValue(`productColorSizeStock.${index}.sizeId`, sizeId);
    if (select.length > index) {
      const updatedSelect = [...select];
      updatedSelect[index]["sizeId"] = sizeId;
      setSelect(updatedSelect);
    } else {
      const updatedSelect = [...select, { sizeId: sizeId }];
      setSelect(updatedSelect);
    }
  };

  const onDeleteProductColorSize = async (
    id: string,
    colorId: number,
    sizeId: number
  ) => {
    if (id != "0") {
      await deleteProductColorSizeStock(id, colorId, sizeId);
    }
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={`${size.id}-S`}
                onClick={() => sizeChanged(index, size.id)}
                className={clsx(
                  "p-1 border cursor-pointer rounded-md mr-2 mb-2 w-16 transition-all text-center",
                  {
                    "bg-blue-500 text-white": size.id === select[index]?.sizeId,
                  }
                )}
              >
                <span>{size.name}</span>
              </div>
            ))}
          </div>

          <span>Colores</span>
          <select
            className="block py-2.5 w-full border bg-gray-200 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
            {...register(`productColorSizeStock.${index}.colorId` as const, {
              valueAsNumber: true,
              required: true,
            })}
            defaultValue={0}
          >
            <option key={`0-C`} value={0} disabled>
              Seleccione un color
            </option>
            {colors.map((color) => (
              <option key={`${color.id}-C`} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>

          <div className="flex flex-col mb-2">
            <span>Inventario</span>
            <input
              {...register(`productColorSizeStock.${index}.stock` as const, {
                valueAsNumber: true,
                required: true,
              })}
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              defaultValue={field.stock}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Precio</span>
            <input
              {...register(`productColorSizeStock.${index}.price` as const, {
                valueAsNumber: true,
                required: true,
              })}
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              defaultValue={field.price}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          append({
            colorId: 0,
            sizeId: 0,
            price: 0,
            stock: 0,
          });
        }}
        className="flex flex-col justify-center items-center btn-primary w-full mb-5"
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          remove(fields.length-1);
          if(fields[fields.length-1].colorId!=0){
            onDeleteProductColorSize(
              productId,
              fields[fields.length-1].colorId,
              fields[fields.length-1].sizeId
            );
          }
        }}
        className={clsx(
          "flex flex-col mb-5 justify-center items-center bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-sm transition-all",
          {
            hidden: fields.length == 1,
          }
        )}
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
        </svg>
      </button>
    </>
  );
};