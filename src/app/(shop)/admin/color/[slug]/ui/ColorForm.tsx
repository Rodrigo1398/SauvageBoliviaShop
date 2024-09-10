"use client";

import { createUpdateColor } from "@/actions";
import { Color } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  color: Color;
}

interface FormInputs {
  name: string;
}

export const ColorForm = ({ color }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...color,
      name: color.name,
    },
  });
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...colorToSave } = data;
    if (color.id) {
      formData.append("id", color.id.toString() ?? "");
    }

    formData.append("name", colorToSave.name);

    const { ok, color: updatedColor } = await createUpdateColor(formData);

    if (!ok) {
      alert("Color no se pudo actualizar");
      return;
    }

    router.replace(`/admin/color/${updatedColor?.id}`);
    
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Color</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("name", { required: true })}
          />
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>
    </form>
  );
};
