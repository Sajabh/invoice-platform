import { prisma } from "@/lib/prisma";
import requireUser from "../utils/hooks";
import { redirect } from "next/navigation";
import { DashboardBlocks } from "../components/dashboardBlocks";
import { InvoiceGraph } from "../components/invoiceGragh";
import { RecentInvoices } from "../components/recentInvoices";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      lastName: true,
      firstName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data?.lastName || !data?.address) {
    redirect("/onboarding");
  }
}

export default async function DashboardRout() {
  const session = await requireUser();
  /*  const data = await getData(session.user?.id as string); */
  await getData(session.user?.id as string);
  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
        <RecentInvoices />
      </div>
    </>
  );
}
