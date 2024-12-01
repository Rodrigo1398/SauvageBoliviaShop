"use client";

import { useState } from "react";

import { ColorSelector, QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Color, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
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

    if (!size || !color || !product.discount) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: datos.price-(datos.price*product.discount/100),
      quantity: quantity,
      size: size,
      color: color,
      image: product.images[0],
      discount: product.discount,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setColor(undefined);
  };

  return (
    <>
      {product.discount != null && product.discount > 0 && (
        <div
          className="w-16 items-center justify-center bg-red-600 text-white font-bold rounded-full px-3 py-1 text-sm"
          role="status"
        >
          <span className="mr-1">-{product.discount}%</span>
        </div>
      )}
      <div className="flex flex-row gap-x-4 mt-4">
        {
          product.discount != null && product.discount>0 &&(
            <p className="text-lg">Bs {datos.price-(datos.price*product.discount/100)}</p>
          )
        }
        <p className={clsx("text-lg",{
          "line-through":product.discount!=null && product.discount>0
        })}>Bs {datos.price}</p>
      </div>
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
