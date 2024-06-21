import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { CategoryForm } from './ui/CategoryForm';
import { getCatgoryByName } from '@/actions';

interface Props {
  params: {
    name: string;
  }
}



export default async function CategoryPage({ params }: Props) {

  const { name } = params;

  const category = await getCatgoryByName(name);
 
  // Todo: new
  if ( !category && name !== 'new' ) {
    redirect('/admin/categories')
  }

  const title = (name === 'new') ? 'Nueva Categoria' : 'Editar Categoria'

  return (
    <>
      <Title title={ title } />
      <CategoryForm category={ category ?? {id:'',name:''} } />
    </>
  );
}