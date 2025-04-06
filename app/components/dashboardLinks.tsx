"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export const dashbourdLinks = [
  {
    href: "/dashboard",
    icon: HomeIcon,
    id: 0,
    name: "Dashboard",
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];

const DashboardLinkd = () => {
  const pathname = usePathname();

  return (
    <>
      {dashbourdLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "bg-primary/40 text-primary"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-primary",
            pathname === link.href && "bg-primary/40 text-primary"
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardLinkd;
