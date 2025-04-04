"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react"; // Importing the Loader2 icon from lucide-react


const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
  <>
  {pending ? (
  <Button disabled className="w-full">
    <Loader2 className="size-4 mr-4 animate-spin"/>
    Please wait...
  </Button> ): (
  <Button type="submit" className="w-full">Submit</Button>)}
  </>
  );
};

export default SubmitButton;
