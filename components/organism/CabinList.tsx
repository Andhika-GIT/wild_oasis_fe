import React from "react";

import { CabinCard } from "@/components/molecules";
import { getAllCabin } from "@/app/action/cabin";
import { NextPage } from "next";
import { CabinCapacityFilter } from "@/types";

export const CabinList: NextPage<CabinCapacityFilter> = async ({
  maxCapacityFilter,
}) => {
  const cabins = await getAllCabin({ maxCapacityFilter });

  return (
    <>
      {cabins && cabins?.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins?.map((cabin, index) => (
            <CabinCard key={index} {...cabin} />
          ))}
        </div>
      )}
    </>
  );
};
