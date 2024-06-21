import { auth } from "@/auth.config";
import { Title } from "@/components";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />

      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
      <Image
        className="size-10"
        src={clsx(
          session.user.image
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZ6Vw-Br-RRvMstTlTqbeGXw4PNepXRrTzg&s"
            : "https://wallpapers-clan.com/wp-content/uploads/2023/10/super-mario-luigi-dark-green-desktop-wallpaper-preview.jpg"
        )}
        width={500}
        height={500}
        alt="foto perfil"
      />
      <h3>{session.user.name}</h3>
      <h3>{session.user.email}</h3>

      <h3 className="text-3xl mb-10">{session.user.role}</h3>
    </div>
  );
}
