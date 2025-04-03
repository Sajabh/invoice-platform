import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { signIn } from "../utils/auth";

const login = () => {
  return (
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
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default login;
