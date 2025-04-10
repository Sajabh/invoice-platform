import requireUser from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    {
      params,
    }: {
      params: Promise<{ invoiceId: string }>;
    }
  ) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userid: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Mailtrap Test",
    };
    const recipients = [
      {
        email: "saja3bh@gmail.com",
      },
    ];

    emailClient.send({
      from: sender,
      to: recipients,
      template_uuid: "9c6f1000-279f-4fdc-8b38-e07aa65c8c96",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice Copmany",
        company_info_address: "Al-Nasra street 123",
        company_info_city: "Jenin",
        company_info_zip_code: "3468665",
        company_info_country: "Palestine",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
