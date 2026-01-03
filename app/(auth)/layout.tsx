import TopNavbar from "@/components/layout/top-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
        <TopNavbar />
      {children}
    </div>
  );
}
