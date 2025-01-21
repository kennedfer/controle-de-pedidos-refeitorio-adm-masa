"use client";

import React from "react";
import { RedirectButton } from "../../../components/RedirectButton";
import { OrderDialog } from "../../../components/OrderDialog";
import { useToast } from "../../../hooks/Toast.js";

export default function OrderPage() {
  return (
    <main className="grid place-items-center h-screen w-screen bg-[#fafafa]">
      {contextHolder}
      <RedirectButton
        path="/"
        label="Voltar"
        size="small"
        className="absolute top-2 left-2"
      />
      <OrderDialog onSubmit={handleSubmit} />
    </main>
  );
}
