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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export const SignUpForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Please all required fields below</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
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
