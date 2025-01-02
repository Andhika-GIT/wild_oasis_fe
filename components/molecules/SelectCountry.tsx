import { getCountries } from "@/app/action/country";

import { Country } from "@/types";
import { NextPage } from "next";

export type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

export const SelectCountry: NextPage<SelectCountryProps> = async ({
  defaultCountry,
  name,
  id,
  className,
}) => {
  const countries = await getCountries();
  const flag =
    countries?.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries?.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
