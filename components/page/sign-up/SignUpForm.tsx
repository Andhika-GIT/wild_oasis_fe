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
import { Error as ApiError } from "@/types";
import { signUp } from "@/app/action/auth";
import Link from "next/link";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpSchemaType } from "@/lib/schemas/sign-up";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export const SignUpForm = () => {
  const [credentialErrorMessage, setCredentialErrorMessage] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  // Mutation
  const { mutate } = useMutation({
    mutationFn: (formData: signUpSchemaType) => {
      setCredentialErrorMessage(null);
      return signUp(formData);
    },
    onSuccess: () => {
      //   window.location.href = "/";
    },
    onError: (error: ApiError) => {
      if (error?.code === 400) {
        console.log(error);
        setCredentialErrorMessage(error.message || "Invalid credential");
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
        <CardTitle>Please all required fields below</CardTitle>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
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
                type="password"
                id="password"
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
        <Link href="/login" className="hover:text-accent-400 transition-colors">
          <Button variant="link" className="w-full">
            Already have account ? sign in here
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
