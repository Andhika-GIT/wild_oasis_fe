import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { NextPage } from "next";

export const SignOutButton: NextPage = () => {
  return (
    <Button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
      <ArrowRightCircleIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </Button>
  );
};
