import { Navigation } from "./Navigation";
import { NextPage } from "next";
import { Logo } from "./Logo";

export const Header: NextPage = () => {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};
