import React from "react";
import { ThemeToggle } from "./theme-toggle";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-secondary text-secondary-foreground p-4 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl">Tomas procastination grid</h1>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
