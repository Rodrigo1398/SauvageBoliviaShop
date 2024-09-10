'use client';

import { createUpdateSize } from "@/actions";
import { Size } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  size: Size;
}

interface FormInputs {
  name: string;
}

export const SizeForm = ({size}:Props) => {
    const router = useRouter();
    const {
      handleSubmit,
      register,
      formState: { isValid },
    } = useForm<FormInputs>({
      defaultValues: {
        ...size,
        name: size.name,
      },
    });
    const onSubmit = async (data: FormInputs) => {
      const formData = new FormData();
      const { ...sizeToSave } = data;
      if (size.id) {
        formData.append("id", size.id.toString() ?? "");
      }
  
      formData.append("name", sizeToSave.name);
  
      const { ok, size: updatedSize } = await createUpdateSize(formData);
  
      if (!ok) {
        alert("La talla no se pudo actualizar");
        return;
      }
  
      router.replace(`/admin/size/${updatedSize?.id}`);
      
    };
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      >
        {/* Textos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Talla</span>
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
