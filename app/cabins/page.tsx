import { CabinList, Filter } from "@/components/organism";
import { LoadingSpinner } from "@/components/ui";
import { NextPage } from "next";
import { Suspense } from "react";

export const metadata = {
  title: "Cabins",
};

type CabinPageParams = {
  searchParams: {
    capacity: string;
  };
};
const Page: NextPage<CabinPageParams> = ({ searchParams }) => {
  let maxCapacityFilter = null;

  if (searchParams?.capacity === "small") {
    maxCapacityFilter = 3;
  } else if (searchParams?.capacity === "medium") {
    maxCapacityFilter = 5;
  } else if (searchParams?.capacity === "large") {
    maxCapacityFilter = 7;
  }

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense
        fallback={<LoadingSpinner size={50} />}
        key={searchParams?.capacity}
      >
        <CabinList maxCapacityFilter={maxCapacityFilter} />
      </Suspense>
    </div>
  );
};

export default Page;
