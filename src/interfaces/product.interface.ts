export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  colors: Color[];
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

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type Color =
  | "ROSA_PALO"
  | "ROJO"
  | "NEGRO"
  | "BLANCO"
  | "AZUL"
  | "VERDE"
  | "VERDE_OLIVA"
  | "NEGRO_ROSA"
  | "NUDE"
  | "SOFIA"
  | "VINO"
  | "FUCSIA"
  | "UNICO"
  | "CRUDO"
  | "RUBI"
  | "MOSTAZA"
  | "GRIS"
  | "BLANCO_SOFIA"
  | "NEGRO_ROJO"
  | "NEGRO_NUDE"
  | "NEGRO_PRINT"
  | "BLANCO_NEGRO"
  | "NEGRO_MOSTAZA_NEGRO_GRIS"
  | "NEGRO_GRIS"
  | "NEGRO_SOFIA"
  | "ROSA";