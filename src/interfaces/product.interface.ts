import { Color } from "./color.interface";
import { ProductColorSize } from "./product-color-size";
import { Size } from "./size.interface";


export interface ProductColorSizeStock{
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  gender: string;
  category: string;
  ProductColorSizeStock: ProductColorSize[];
  images: string[];
}
export interface Product {
  id: string;
  description: string;
  images: string[];
  slug: string;
  tags: string[];
  title: string;
  //todo: type: Type;
  gender: Gender;
  category: Category;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  color: Color;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

type Gender = "hombre" | "mujer" | "sex_shop";
type Category =
  | "Boxers"
  | "Soutiens"
  | "Bodys"
  | "Corseteria"
  | "Bombachas"
  | "Portaligas"
  | "Bikinis_Swinwear"
  | "Pijamas_Homewear"
  | "Accesorios"
  | "Para_ellos"
  | "Para_ellas"
  | "Pugs"
  | "Disfraces"
  | "Lubricantes"
  | "Juegos";
