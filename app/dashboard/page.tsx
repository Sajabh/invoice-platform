import { redirect } from "next/navigation";
import { auth } from "../utils/auth";

export default async  function DashboardRout () {
    const session = await auth();
    if (!session?.user) {
        redirect("/login"); // private mode????
    }
    // If the user is authenticated, you can access their session data here
    return ( 
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-4 text-lg text-gray-600">Welcome to your dashboard!</p>
        </div>
     );
}