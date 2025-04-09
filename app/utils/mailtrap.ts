import { MailtrapClient } from "mailtrap";

// This file is used to send emails using Mailtrap.
export const emailClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!,
});