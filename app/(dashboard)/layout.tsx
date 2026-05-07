import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-10">
      <Header />
      <main className="container xl:max-w-[1185px] px-1 sm:px-0 sm:mx-auto mt-7">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
