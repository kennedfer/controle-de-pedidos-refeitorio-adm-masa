import React from "react";
import Image from "next/image";

import logoEqx from "../public/images/logo-eqx.webp";

export function EquinoxLogo() {
  return <Image src={logoEqx} alt="Logo" width={150} height={50} />;
}

export const Header = () => {
  return (
    <header className="bg-gray-100 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <EquinoxLogo />
      </div>
    </header>
  );
};
