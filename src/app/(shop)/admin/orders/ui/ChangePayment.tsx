"use client";

import { changePaymentStatus } from "@/actions";
import { IoCardOutline } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  id: string;
  isPaid: boolean;
}

export const ChangePayment = ({ id, isPaid }: Props) => {
  const [paid, setPaid] = useState<boolean>(isPaid);

  const handleChange = () => {
    setPaid(!paid);
    changePaymentStatus(id, !paid);
  };

  return (
    <>
      <IoCardOutline
        className={clsx({
          "text-red-800": paid ===false,
          "text-green-800": paid === true,
        })}
      />
      <span
        className={clsx("mx-2 ", {
          "text-red-800":paid === false,
          "text-green-800": paid === true,
        })}
      >
        {paid === true ? "Pagada" : "No Pagada"}
      </span>
      <input
        onChange={handleChange}
        type="checkbox"
        checked={paid}
        className={clsx(
          "w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2",
          {
            "text-red-600 focus:ring-red-500": paid === false,
            "text-green-600 focus:ring-green-500": paid === true,
          }
        )}
      />
    </>
  );
};
