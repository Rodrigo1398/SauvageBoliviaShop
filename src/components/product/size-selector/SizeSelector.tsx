import type { Size } from "@/interfaces";
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
  selectedSize?: Size;
  availableSizes: Datos[];
  onSizeChanged: (size: Size) => void;
  onDatoChanged: (dato: Datos) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
  onDatoChanged,
}: Props) => {
  const uniqueSizes = availableSizes.filter((dato, index, self) =>
    index === self.findIndex((t) => t.size.id === dato.size.id)
  );
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {uniqueSizes.map((dato) => (
          <button
            key={dato.size.id}
            onClick={() => {
              onSizeChanged(dato.size);
              onDatoChanged(dato);
            }}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: dato.size === selectedSize,
            })}
          >
            {dato.size.name}
          </button>
        ))}
      </div>
    </div>
  );
};
