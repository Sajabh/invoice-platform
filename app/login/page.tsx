import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { auth, signIn } from "../utils/auth";
import SubmitButton from "../components/submitButtons";
import { redirect } from "next/navigation";

const login = async () => {
  // Check if user is already authenticated
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return (
    // Render the login form
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text=2xl">Login</CardTitle>
            <CardDescription>Please enter your email to login.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="border rounded-md p-2 w-full mt-1"
                  />
                </Label>
              </div>
              <SubmitButton text="Login"/>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default login;
