import CreateInvoice from "@/app/components/createInvoice";
import requireUser from "@/app/utils/hooks";
import { prisma } from "@/lib/prisma";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  return data;
}

const InvoicesCreationRouts = async () => {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      address={data?.address as string}
      email={data?.email as string}
      firstName={data?.firstName as string}
    />
  );
};

export default InvoicesCreationRouts;