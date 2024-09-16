import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="">
      <div className="flex w-full justify-center text-xs pb-10">
        <Link
          href="https://www.facebook.com/SauvageBoliviaa?mibextid=ZbWKwL"
          className="mx-3"
          target="_blank"
        >
          Facebook
        </Link>

        <Link
          href="https://wa.me/74542714?text=Hola, me gustaría obtener más información sobre..."
          className="mx-3"
          target="_blank"
        >
          Whatsapp
        </Link>

        <Link
          href="https://www.instagram.com/sauvage_bolivia?igsh=b3hidjN3N3Z1Y3Jm"
          className="mx-3"
          target="_blank"
        >
          Instagram
        </Link>
        <Link
          href="https://www.tiktok.com/@sauvage_bolivia?_t=8pChcj8iVCX&_r=1"
          className="mx-3"
          target="_blank"
        >
          Tik Tok
        </Link>
      </div>

      <div className="flex w-full justify-center text-xs pb-10">
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold `}>
            Teslo{" "}
          </span>
          <span>| shop </span>
          <span>© {new Date().getFullYear()}</span>
        </Link>

        <Link href="/" className="mx-3">
          Privacidad & Legal
        </Link>

        <Link href="/" className="mx-3">
          Ubicaciones
        </Link>
      </div>
    </div>
  );
};
