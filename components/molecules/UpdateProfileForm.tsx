"use client";

import { updateNationalitySchema, updateNationalitySchemaType } from "@/lib/schemas/update-nationality";
import { Country, CurrentUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Error as ApiError } from "@/types";
import { UpdateCurrentUserNationality } from "@/app/action/user";

type UpdateProfileFormProps = {
  countries: Country[];
  currentUser: CurrentUser | undefined;
};

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  countries,
  currentUser,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm<updateNationalitySchemaType>({
    resolver: zodResolver(updateNationalitySchema),
    defaultValues: {
      nationality: currentUser?.nationality ?? "",
      national_id: currentUser?.national_id ?? "",
      country_flag: countries.find(c => c.name === currentUser?.nationality)?.flag ?? "",
    },
  });

  const selectedCountry = watch("nationality");

  // Update counter_flag when selectedCountry or natinality change
  useEffect(() => {
    const country = countries.find(c => c.name === selectedCountry);
    setValue("country_flag", country?.flag ?? "");
  }, [selectedCountry, countries, setValue]);

  const { mutate } = useMutation({
    mutationFn: (data: updateNationalitySchemaType) => {
      setErrorMessage(null);
      return UpdateCurrentUserNationality(data);
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error: ApiError) => {
      setErrorMessage(error.message);
    },
  });


  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="bg-primary-900 py-8 px-12 text-lg flex flex-col gap-6"
    >
      {/* hidden country_flag */}
      <input type="hidden" {...register("country_flag")}  />

      {/* fullname & email: disable saja */}
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full rounded-sm shadow-sm disabled:bg-gray-600 disabled:text-gray-400"
          value={currentUser?.fullname ?? ""}
        />
      </div>
      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full rounded-sm shadow-sm disabled:bg-gray-600 disabled:text-gray-400"
          value={currentUser?.email ?? ""}
        />
      </div>

      {/* nationality select */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img   
            src={countries.find(c => c.name === selectedCountry)?.flag ?? ""} 
            alt="" className="h-5 rounded-sm" />
        </div>
        <select
          id="nationality"
          {...register("nationality")}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full rounded-sm shadow-sm"
        >
          <option value="">Select country...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.nationality && (
          <p className="text-red-500">{errors.nationality.message}</p>
        )}
      </div>

      {/* national ID */}
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          id="nationalID"
          {...register("national_id")}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full rounded-sm shadow-sm"
        />
      </div>

      {/* error message */}
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 rounded-xl hover:bg-accent-600 transition"
        >
          Update profile
        </button>
      </div>
    </form>
  );
};
