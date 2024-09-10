import { auth } from "@/auth";
import { Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <div className="w-full h-[74vh]">
      <div className="flex flex-col items-center pt-5">
      <Title title="Perfil"/>
        <Image
          className="w-20 h-20 rounded-full"
          src={session.user.image || "/imgs/user.webp"}
          width={500}
          height={500}
          alt="Avatar"
        />
        <h2 className="text-xl">{session.user.name}</h2>
        <h3 className="text-xl">{session.user.email}</h3>
        <p className="text-xl"><span className="font-bold">Nro Pedidos:</span>{}</p>
      </div>
    </div>
  );
}
