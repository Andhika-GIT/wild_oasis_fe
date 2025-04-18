"use client";

import {
    Card,
    CardContent, CardFooter,
    CardHeader,
    CardTitle,
    Label,
    Input, Button
  } from "@/components/ui";
import Link from "next/link";

export const LoginForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Enter your email and password</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button variant="outline" className="w-full">
          Submit
        </Button>
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
