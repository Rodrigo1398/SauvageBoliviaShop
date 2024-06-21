import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div>
      <div className="flex w-full justify-center text-xs pb-10">
        
        <Link href="/" className="mx-3">
          Facebook
        </Link>

        <Link href="/" className="mx-3">
          Whatsapp
        </Link>

        <Link href="/" className="mx-3">
          Instagram
        </Link>
        <Link href="/" className="mx-3">
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
