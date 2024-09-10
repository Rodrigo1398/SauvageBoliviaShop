import type { Color } from "@/interfaces";
import clsx from "clsx";

interface Datos {
  size: {
    id: number;
    name: string;
  };
  color: {
    id: number;
    name: string;
  };
  price: number;
  stock: number;
}
interface Props {
  selectedColor?: Color;
  availableColors: Datos[];
  onColorChanged: (color: Color) => void;
  datoColor: Datos;
  onDatoChanged: (dato: Datos) => void;
}

export const ColorSelector = ({
  selectedColor,
  availableColors,
  onColorChanged,
  datoColor,
  onDatoChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Colores disponibles</h3>

      <div className="flex">
        {availableColors.map((dato) =>
          dato.size.id === datoColor.size.id ? (
            <button
              key={dato.color.id}
              onClick={() => {
                onColorChanged(dato.color);
                onDatoChanged(dato);
              }}
              className={clsx("mx-2 hover:underline text-lg", {
                underline: dato.color === selectedColor,
              })}
            >
              {dato.color.name}
            </button>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};
