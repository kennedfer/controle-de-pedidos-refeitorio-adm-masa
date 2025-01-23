import { useState, useMemo } from "react";
import { PendingTable } from "./PendingTable";
import { useOrders } from "../hooks/orders";

export function PendingPanel() {
  const period = useMemo(
    () => ({
      start: new Date(0),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
    [],
  );

  // const orders = useOrders("pending", period);
  const orders = [
    {
      id: 0,
      owner: "John Doe",
      type: "Product",
      quantity: 10,
      costCenter: "CC1001",
      comments: "Urgent order",
      price: 100.0,
      status: "pending",
      createdAt: "2025-01-22T03:00:00.000Z",
      targetDate: "2025-01-22T03:00:00.000Z",
      targetPlace: "Warehouse 1",
    },
    {
      id: 1,
      owner: "Kenned Ferreira",
      type: "Product",
      quantity: 10,
      costCenter: "CC1001",
      comments: "",
      price: 100.0,
      status: "pending",
      createdAt: "2025-01-22T03:00:00.000Z",
      targetDate: "2025-01-22T03:00:00.000Z",
      targetPlace: "Warehouse 1",
    },
  ];
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div onClick={() => setRefresh(refresh + 1)}>
        <PendingTable refresh={setRefresh} orders={orders} />
      </div>
    </>
  );
}
