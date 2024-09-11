import React from "react";

import { CabinCard } from "@/components/molecules";
import { getAllCabin } from "@/app/action/cabin";

export const CabinList = async () => {
  const cabins = await getAllCabin();

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
