"use client";

import { useState } from "react";

import { ColorSelector, QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Color, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

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
  product: Product;
  productColorSizeStock: Datos[];
}

export const AddToCart = ({ product, productColorSizeStock }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductTocart);

  const [size, setSize] = useState<Size | undefined>(
    productColorSizeStock[0].size
  );
  const [color, setColor] = useState<Color | undefined>();

  const [datos, setDatos] = useState<Datos>(productColorSizeStock[0]);

  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size || !color) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: datos.price,
      quantity: quantity,
      size: size,
      color: color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    // setSize(undefined);
    setColor(undefined);
  };

  return (
    <>
      <p className="text-lg mb-5">Bs {datos.price}</p>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={productColorSizeStock}
        onSizeChanged={setSize}
        onDatoChanged={setDatos}
      />

      {/* Selector de Colores */}
      <ColorSelector
        selectedColor={color}
        availableColors={productColorSizeStock}
        onColorChanged={setColor}
        onDatoChanged={setDatos}
        datoColor={datos}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
