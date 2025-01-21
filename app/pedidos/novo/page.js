'use client'

import React from "react";
import { Card } from "@blueprintjs/core";
import { RedirectButton } from "../../../components/RedirectButton";
import { OrderForm } from "../../../components/OrderForm"
import { useToast } from "../../../hooks/Toast.js";

export default function OrderPage() {
  const [Toast, contextHolder] = useToast();

  async function handleSubmit(values) {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(values)
      });

      const data = await response.json();
      Toast.success("Pedido realizado com sucesso!");

      form.resetFields();
    } catch (err) {
      Toast.error(Toast.INTERNET_ERROR_MESSAGE);
    }
  }

  return (
    <main className="grid place-items-center h-screen w-screen bg-[#fafafa]">
      {contextHolder}
      <RedirectButton path="/" label="Voltar" size="small" className="absolute top-2 left-2" />
      <Card >
        <h2 className="text-xl text-center font-bold w-full">Novo Pedido</h2>
        <OrderForm onFinish={handleSubmit} />
      </Card>
    </main>
  );
}