import { redirect } from "next/navigation";
import { signOut } from "../utils/auth";
import requireUser from "../utils/hooks";

export default async function DashboardRout() {
  /* const session = await auth();
    if (!session?.user) {
        redirect("/login"); // private mode????
    } */
  await requireUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Welcome to your dashboard!</p>
      <form
        className="mt-6"
      >
        <button type="submit"> SignOut </button>
      </form>
    </div>
  );
}
