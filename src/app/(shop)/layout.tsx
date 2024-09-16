import { Footer, Sidebar, Slider, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <Slider />
      <TopMenu />
      <Sidebar />
      <div className="px-1 sm:px-10 flex-grow">{children}</div>
      <Footer />
    </main>
  );
}
