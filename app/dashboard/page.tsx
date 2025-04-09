import { prisma } from "@/lib/prisma";
import { signOut } from "../utils/auth";
import requireUser from "../utils/hooks";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";


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
      redirect("/onboarding")
    } 
  }
  
  export default async function DashboardRout() {
     const session = await requireUser();
    /*  const data = await getData(session.user?.id as string); */
    await getData(session.user?.id as string);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Welcome to your dashboard!</p>
      <form
        className="mt-6"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit"> SignOut </Button>
      </form>
    </div>
  );
}
