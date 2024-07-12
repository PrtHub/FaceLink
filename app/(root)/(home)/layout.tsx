import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <section className="flex flex-1 flex-col min-h-screen px-6 sm:px-14 pb-6 max-md:pb-14 pt-28">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
