import { useState, useMemo, useCallback } from "react";
import { PendingTable } from "./PendingTable";
import { useOrders } from "../hooks/orders";
import { Toaster } from "../hooks/toast";

//! TODO: mover para um 'utils'
const changeOrderStatus = async (orderId, status, refresh) => {
  try {
    console.log(orderId);
    const response = await fetch("/api/order/" + orderId, {
      method: "PUT",
      body: status,
    });
    const updatedOrder = await response.json();

    if (updatedOrder.status === "approved") {
      Toaster.success("Pedido aprovado!");
    } else {
      Toaster.warning("Pedido Reprovado!");
    }

    refresh((prev) => prev + 1);
  } catch (err) {
    Toaster.danger("Erro: Verifique sua conexão de internet");
  }
};

export function PendingPanel() {
  const period = useMemo(
    () => ({
      start: new Date(0),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
    [],
  );

  const [refresh, setRefresh] = useState(0);
  // const orders = useOrders("pending", period, refresh);

  const orders = [
    {
      id: 0,
      owner: "João Silva",
      type: "Compra",
      quantity: 5,
      costCenter: "Marketing",
      comments: "Compra de material promocional",
      price: 150.0,
      status: "pending", // Status pode ser 'pending', 'approved' ou 'rejected'
      targetDate: "2025-02-10", // Formato de data (AAAA-MM-DD)
      targetPlace: "São Paulo",
    },
    {
      id: 1,
      owner: "Maria Oliveira",
      type: "Venda",
      quantity: 2,
      costCenter: "Vendas",
      comments: "Venda de produto para cliente A",
      price: 300.0,
      status: "approved",
      targetDate: "2025-02-15",
      targetPlace: "Rio de Janeiro",
    },
    {
      id: 2,
      owner: "Carlos Souza",
      type: "Compra",
      quantity: 10,
      costCenter: "TI",
      comments: "",
      price: 1200.0,
      status: "rejected",
      targetDate: "2025-03-01",
      targetPlace: "Belo Horizonte",
    },
    {
      id: 3,
      owner: "Ana Costa",
      type: "Serviço",
      quantity: 1,
      costCenter: "Suporte",
      comments: "Serviço de consultoria",
      price: 500.0,
      status: "pending",
      targetDate: "2025-02-20",
      targetPlace: "Curitiba",
    },
  ];

  return (
    <div>
      <PendingTable
        refresh={setRefresh}
        orders={orders}
        changeOrderStatus={changeOrderStatus}
      />
    </div>
  );
}
