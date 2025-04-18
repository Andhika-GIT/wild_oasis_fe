"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button,
} from "@/components/ui";
import Link from "next/link";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/schemas/login";

export const LoginForm = () => {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Enter your email and password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(() => {})}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full mt-6">
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Link
          href="/sign-up"
          className="hover:text-accent-400 transition-colors"
        >
          <Button variant="link" className="w-full">
            Don't have account ? sign up here
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
