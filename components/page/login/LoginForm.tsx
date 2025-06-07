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
import { Error as ApiError } from "@/types";
import { signIn } from "@/app/action/auth";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/schemas/login";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [credentialErrorMessage, setCredentialErrorMessage] = useState<
    string | null
  >(null);

  const router = useRouter();

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  // Mutation
  const { mutate } = useMutation({
    mutationFn: (formData: loginSchemaType) => {
      setCredentialErrorMessage(null);
      return signIn(formData);
    },
    onSuccess: () => {
      toast.success("Successfully logged in");
      router.refresh();
    },
    onError: (error: ApiError) => {
      if (error?.code === 400) {
        console.log(error);
        setCredentialErrorMessage("Invalid Username or Password");
      } else {
        setCredentialErrorMessage(
          "Something went wrong please try again later"
        );
      }
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Enter your email and password</CardTitle>
      </CardHeader>
      <CardContent>
        {credentialErrorMessage && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {credentialErrorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit((formData) => mutate(formData))}>
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
