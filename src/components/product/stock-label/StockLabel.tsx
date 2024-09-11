"use client";

import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  sku: string;
}

export const StockLabel = ({ sku }: Props) => {
  return (
    <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
      SKU: {sku.split('-')[0]}
    </h1>
  );
};
