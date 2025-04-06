import { ReactNode } from "react";
import requireUser from "../utils/hooks";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser();
  return (
    <>
      <div
        className="grid min-h-screen w-full md:grid-cols-[220px-1fr]
        lg:grid-cols-[280px-1fr]"
      >
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items=-center gap-2">
                <Image
                  src={logo}
                  alt="logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <p className="text-2xl font-bold">
                  Invoice<span className="text-blue-600">Saja</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
