"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { Button, LoadingSpinner } from "../ui";
import { NextPage } from "next";
import { useMutation } from "@tanstack/react-query";
import { Error as ApiError } from "@/types";
import { signOutUser } from "@/app/action/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";

export const SignOutButton: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return signOutUser();
    },
    onSuccess: () => {
      toast.success("Sucessfully sign out");
      setIsLoading(false);
      router.refresh();
      router.push("/");
    },
    onError: (error: ApiError) => {
      setIsLoading(false);
      toast.error(error.message || "something went wrong");
    },
  });

  return (
    <Button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full" disabled={isLoading} onClick={() => mutate()}>
      {!isLoading ? (
        <>
          <ArrowRightCircleIcon className="h-5 w-5 text-primary-600" />
          <span>Sign out</span>
        </>
      ) : (
        <span className="mx-auto">
          <LoadingSpinner />
        </span>
      )}
    </Button>
  );
};
