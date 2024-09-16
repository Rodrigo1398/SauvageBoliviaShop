export interface ProductAdmin {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  gender: string;
  category: string;
  ProductImage: { url: string }[];
  ProductColorSizeStock: ProductColorSizeStock[];
  images: string[];
}

interface ProductColorSizeStock {
  productId: string;
  colorId: number;
  sizeId: number;
  stock: number;
  price: number;
  size: { name: string };
  color: { name: string };
}
