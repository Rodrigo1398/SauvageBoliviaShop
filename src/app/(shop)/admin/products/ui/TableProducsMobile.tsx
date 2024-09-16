import { ProductImage } from "@/components";
import { ProductAdmin } from "@/interfaces";
import Link from "next/link";

interface Props {
  products: ProductAdmin[];
}

export const TableProducsMobile = ({ products }: Props) => {
  return (
    <div className="block md:hidden">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Imagen
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Titulo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Inventario
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/product/${product.slug}`}>
                  <ProductImage
                    src={product.ProductImage[0]?.url}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
              </td>

              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/product/${product.slug}`}
                  className="hover:underline"
                >
                  {product.title}
                </Link>
              </td>

              <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {product.ProductColorSizeStock.reduce(
                  (total, obj) => total + obj.stock,
                  0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
