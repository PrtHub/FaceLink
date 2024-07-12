"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0  h-screen w-fit lg:w-64 max-sm:hidden flex flex-col justify-between bg-dark-1 text-white p-6 pt-28">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            link.route === pathname || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.lable}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                {
                  "bg-green-1": isActive,
                }
              )}
            >
              <link.icon />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.lable}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
