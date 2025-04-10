import  EditInvoice  from "@/app/components/editInvoice";
import requireUser from "@/app/utils/hooks";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userid: userId,
        },
    });
    
    if (!data) {
        /* return <h1>Invoice not found</h1>; */
        return notFound();
    }
    
    return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function editeINvoiceRoute({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();
    const data = await getData(invoiceId, session.user?.id as string);
  
    /* console.log("data", data); */
    return <EditInvoice data={data} />;
  }