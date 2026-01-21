import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MainNavbar from "@/components/layout/navbar/main-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="block lg:hidden">
        <MainNavbar />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
