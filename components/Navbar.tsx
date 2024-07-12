import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between fixed z-50 bg-dark-1 px-6 lg:px-10 py-4">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="max-sm:size-10"
        />
        <p className="text-2xl font-bold text-white max-sm:hidden">FaceLink</p>
      </Link>
      <section className="flex items-center justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </section>
    </nav>
  );
};

export default Navbar;
