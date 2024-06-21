"use client";

import { changePaymentStatus } from "@/actions";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  id: string;
  isPaid: boolean;
}

export const ChangePayment = ({ id, isPaid }: Props) => {
  return (
    <>
      {isPaid ? (
        <>
          <IoCardOutline className="text-green-800" />
          <span className="mx-2 text-green-800">Pagada</span>
          <input
            onClick={() => changePaymentStatus(id, isPaid)}
            type="checkbox"
            checked={isPaid}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
          />
        </>
      ) : (
        <>
          <IoCardOutline className="text-red-800" />
          <span className="mx-2 text-red-800">No Pagada</span>
          <input
            onClick={() => changePaymentStatus(id, isPaid)}
            type="checkbox"
            checked={isPaid}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
          />
        </>
      )}
    </>
  );
};
