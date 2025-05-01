import { SignUpForm } from "@/components/page";

export const metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Create account to access your guest area
      </h2>
      <SignUpForm />
    </div>
  );
}
