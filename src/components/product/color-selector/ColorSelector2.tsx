import type { Color } from '@/interfaces';
import clsx from 'clsx';


interface Props {
  selectedColor?: Color;
  availableColors: Color[];
  images:string[];
  handleColorChange:(color:string) => void;
}



export const ColorSelector2 = ({ selectedColor, availableColors, handleColorChange }: Props) => {

  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Colores disponibles</h3>

      <div className="flex">

        {
          availableColors.map( color => (
            <button 
              key={ color }
              onClick={ () => handleColorChange(color) }
              className={
                clsx(
                  "mx-2 hover:underline text-lg",
                  {
                    'underline': color === selectedColor
                  }
                )
              }
            >
              { color}
            </button>
          ))
        }
      </div>
    </div>
  )
}