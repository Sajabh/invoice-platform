"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import requireUser from "./utils/hooks";
import { prisma } from "@/lib/prisma";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurreny";

// This function is used to onboard a user by updating their information in the database.
export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  // Check if the user is authenticated before proceeding with the onboarding process.
  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  // Parse the form data using the onboarding schema to validate the input.
  if (submission.status !== "success") {
    return submission.reply();
  }
  // If the parsing is successful, update the user's information in the database.
  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemsDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userid: session.user?.id,
    },
  });

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
    template_uuid: "21c61310-3493-4ecd-a9e7-221a97e56760",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://invoice-platform-two.vercel.app//api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userid: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemsDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

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
    template_uuid: "2c0c8004-ee72-4d14-8e5e-16c1afa3b23e",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://invoice-platform-two.vercel.app//api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      id: invoiceId,
      userid: session.user?.id,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function markAsPaidAction(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      id: invoiceId,
      userid: session.user?.id,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices")
}
