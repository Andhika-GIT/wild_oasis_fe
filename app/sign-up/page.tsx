import {
  Card,
  CardContent, CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input, Button
} from "@/components/ui";
import Link from "next/link";

export const metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Create account to access your guest area
      </h2>
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full">
            Submit
          </Button>
          <Link
            href="/login"
            className="hover:text-accent-400 transition-colors"
          >
            <Button variant="link" className="w-full">
              Already have account ? sign in here
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
