export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

import { Category, Gender } from '@prisma/client';
import { redirect } from 'next/navigation';



interface Props {
  params: {
    gender: string;
    category:string;
  },
  searchParams: {
    page?: string; 
  }
}


export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender, category } = params;
  
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender,
    category: category as Category,
  });


  if ( products.length === 0 ) {
    redirect(`/gender/${ gender }/${category}`);
  }
  

  const labels: Record<string, string>  = {
    'hombre': 'para hombres',
    'mujer': 'para mujeres',
    'sex_shop': 'sex shop',
  }

  return (
    <>
      <Title
        title={`Artículos de ${ labels[gender] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={ totalPages }  />
      
    </>
  );
}