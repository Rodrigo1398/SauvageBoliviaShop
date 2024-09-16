'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product, ProductColorSizeStock } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: ProductColorSizeStock;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );

  const localSrc = ( displayImage ) 
  ? displayImage.startsWith('https') // https://urlcompletodelaimagen.jpg
    ? displayImage
    : `/products/${ displayImage }`
  : '/imgs/placeholder.jpg';

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={ `/product/${ product.slug }` }>
        <Image
          src={ localSrc }
          alt={ product.title }
          className="w-full object-cover rounded"
          width={ 1000 }
          height={ 1000 }
          priority
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>
        <span className="font-bold">BS { product.ProductColorSizeStock[0].price }</span>
      </div>

    </div>
  );
};