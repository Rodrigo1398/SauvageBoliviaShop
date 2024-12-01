import { ProductColorSizeStock } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";
import Link from "next/link";

interface Props {
  products: ProductColorSizeStock[];
}

export const ProductGrid = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 py-12">
        <div className="flex flex-col justify-center items-center max-w-md w-full shadow-lg rounded-lg p-8 text-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-24"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.812 4.793l3.188 -1.793l8 4.5v8.5m-2.282 1.784l-5.718 3.216l-8 -4.5v-9l2.223 -1.25" />
            <path d="M14.543 10.57l5.457 -3.07" />
            <path d="M12 12v9" />
            <path d="M12 12l-8 -4.5" />
            <path d="M16 5.25l-4.35 2.447m-2.564 1.442l-1.086 .611" />
            <path d="M3 3l18 18" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No hay productos disponibles
          </h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, actualmente no hay productos disponibles en esta
            categoría. Por favor, intenta más tarde o explora otras secciones de
            nuestra tienda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-10">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
