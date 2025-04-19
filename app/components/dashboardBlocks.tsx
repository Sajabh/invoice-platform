import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "../utils/formatCurreny";
import requireUser from "../utils/hooks";
import Xcard from "./xcard";

async function getData(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userid: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userid: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userid: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidinvoices,
  };
}

export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidinvoices } = await getData(
    session.user?.id as string
  );

  const totalRevenue = data.reduce((acc, invoice) => acc + invoice.total, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Xcard
        title="Total Revenue"
        icon={<DollarSign className="size-4 text-muted-foreground" />}
      >
        <h2 className="text-2xl font-bold">
          {formatCurrency({
            amount: totalRevenue,
            currency: "USD",
          })}
        </h2>
        <p className="text-xs text-muted-foreground">Based on total volume</p>
      </Xcard>
      
      <Xcard
        title="Total Invoices Issued"
        icon={<Users className="size-4 text-muted-foreground" />}
      >
        <h2 className="text-2xl font-bold">+{data.length}</h2>
        <p className="text-xs text-muted-foreground">Total Invoices Issued!</p>
      </Xcard>
      
      <Xcard
        title="Paid Invoices"
        icon={<CreditCard className="size-4 text-muted-foreground" />}
      >
        <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
        <p className="text-xs text-muted-foreground">
          Total Invoices which have been paid!
        </p>
      </Xcard>
      
      <Xcard
        title="Pending Invoices"
        icon={<Activity className="size-4 text-muted-foreground" />}
      >
        <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
        <p className="text-xs text-muted-foreground">
          Invoices which are currently pending!
        </p>
      </Xcard>
    </div>
  );
}