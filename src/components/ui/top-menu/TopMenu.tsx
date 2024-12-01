"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import {
  IoSearchOutline,
  IoCartOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setLoaded(true);
  }, []);


  const menuItems = [
    {
      title: "Hombre",
      link: "hombre",
      items: ["Boxers"],
    },
    {
      title: "Mujer",
      link: "mujer",
      items: [
        "Soutiens",
        "Bodys",
        "Corseteria",
        "Bombachas",
        "Portaligas",
        "Bikinis Swinwear",
        "Pijamas Homewear",
        "Accesorios",
      ],
    },
    {
      title: "Sex Shop",
      link: "sex_shop",
      items: [
        "Para ellos",
        "Para ellas",
        "Pugs",
        "Disfraces",
        "Lubricantes",
        "Juegos",
      ],
    },
  ];

  const handleMenuEnter = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: true }));
  };

  const handleMenuLeave = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: false }));
  };

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
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => handleMenuEnter(item.title)}
              onMouseLeave={() => handleMenuLeave(item.title)}
            >
              <div className="flex items-center space-x-1">
                <Link
                  href={`/gender/${item.link}`}
                  className="py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  {item.title}
                </Link>
                <button
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  aria-label={`Expandir menú de ${item.title}`}
                  onClick={() =>
                    setOpenMenus((prev) => ({
                      ...prev,
                      [item.title]: !prev[item.title],
                    }))
                  }
                >
                  <IoChevronDownOutline className="w-4 h-4" />
                </button>
              </div>
              <AnimatePresence>
                {openMenus[item.title] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
                  >
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/gender/${item.link}/${subItem.replace(
                          " ",
                          "_"
                        )}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {/* Search, Cart, Menu */}
        <div className="flex items-center">
          <div className="hidden md:flex relative">
            <input
              type="search"
              placeholder="Buscar..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <IoSearchOutline className="w-5 h-5 text-gray-500" />
            </button>
          </div>

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
    </>
  );
};
