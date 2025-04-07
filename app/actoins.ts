"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { onboardingSchema } from "./utils/zodSchemas";
import requireUser from "./utils/hooks";
import { prisma } from "@/lib/prisma";

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
