import React from "react";
import Image from "next/image";

import logoEqx from "../public/images/logo-eqx.webp";
import { Divider } from "@blueprintjs/core";

export const Header = () => {
  return (
    <header className="bg-gray-100 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image src={logoEqx} alt="Logo" width={150} height={50} />
        <Divider />
        <h4 className="bp5-heading {{.modifier}} text-gray-500">
          Controle de Pedidos - Restaurante MASA
        </h4>
      </div>
    </header>
  );
};
