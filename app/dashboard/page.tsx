import { prisma } from "@/lib/prisma";
import requireUser from "../utils/hooks";
import { DashboardBlocks } from "../components/dashboardBlocks";
import { InvoiceGraph } from "../components/invoiceGragh";
import { RecentInvoices } from "../components/recentInvoices";
import { EmptyState } from "../components/emptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

export default async function DashboardRout() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {!data ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
}
