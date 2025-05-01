import {
  Card,
  CardContent, CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input, Button
} from "@/components/ui";
import { LoginForm } from "@/components/page";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <LoginForm />
    </div>
  );
}
