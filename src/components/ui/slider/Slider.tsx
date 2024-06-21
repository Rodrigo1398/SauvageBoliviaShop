import "./Slider.css";

export const Slider = () => {
  return (
    <div className="flex bg-black w-full h-7 overflow-hidden relative items-center">
      <div className="flex absolute gap-8 slider">
        <p className="text-white inline-block w-auto text-nowrap">
          Ofertas!!! El 50% de descuento solo por este mes!!! No te lo
        </p>
        <p className="text-white inline-block w-auto text-nowrap">
          Ofertas!!! El 50% de descuento solo por este mes!!! No te lo
        </p>
        <p className="text-white inline-block w-auto text-nowrap">
          Ofertas!!! El 50% de descuento solo por este mes!!! No te lo
        </p>
        <p className="text-white inline-block w-auto text-nowrap">
          Ofertas!!! El 50% de descuento solo por este mes!!! No te lo
        </p>
      </div>
    </div>
  );
};
