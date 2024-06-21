"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
    </PayPalScriptProvider>
  );
};
