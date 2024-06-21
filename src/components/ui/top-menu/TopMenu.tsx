"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import clsx from "clsx";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  const [men, setMen] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold`}>
              Sauvage
            </span>
            <span> | Bolivia</span>
          </Link>
        </div>

        {/* Center Menu */}
        <div
          onMouseEnter={() => setMen(true)}
          onMouseLeave={() => setMen(false)}
          className="hidden sm:block"
        >
          <div className="">
            <Link
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
              href="/"
            >
              Productos
            </Link>
          </div>
        </div>
        {/* Search, Cart, Menu */}
        <div className="flex items-center">
          <Link href="/search" className="mx-2">
            <IoSearchOutline className="w-5 h-5" />
          </Link>

          <Link
            href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
            className="mx-2"
          >
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>

          <button
            onClick={openSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Menú
          </button>
        </div>
      </nav>
      <div
        onMouseEnter={() => setMen(true)}
        onMouseLeave={() => setMen(false)}
        className={clsx(
          "absolute m-[-10px] w-full z-50 transition-all flex bg-white py-5 justify-center gap-x-14",
          {
            hidden: men === false,
          }
        )}
      >
        <ul>
          <li className="font-bold">
            <Link href="/gender/hombre">Hombre</Link>
          </li>
          <li>
            <Link href="/gender/hombre/Boxers">Boxers</Link>
          </li>
        </ul>
        <ul>
          <li className="font-bold">
            <Link href="/gender/mujer">Mujer</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Soutiens">Soutiens</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Bodys">Bodys</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Corseteria">Corseteria</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Bombachas">Bombachas</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Portaligas">Portaligas</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Bikinis_Swinwear">Bikinis Swinwear</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Pijamas_Homewear">Pijamas Homewear</Link>
          </li>
          <li>
            <Link href="/gender/mujer/Accesorios">Accesorios</Link>
          </li>
        </ul>
        <ul>
          <li className="font-bold">
            <Link href="/gender/sex_shop">Shex Shop</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Para_ellos">Para ellos</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Para ellas">Para ellas</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Pugs">Pugs</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Disfraces">Disfraces</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Lubricantes">Lubricantes</Link>
          </li>
          <li>
            <Link href="/gender/sex_shop/Juegos">Juegos</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
