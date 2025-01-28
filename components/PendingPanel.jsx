import { useMemo } from "react";
import { useOrders } from "../hooks/orders";
import { PendingOrder } from "./PendingOrder";
import { TableHeader } from "./Table";

function PendingTable({ orders, refresh }) {
  return (
    <table className="w-full table-auto text-xs">
      <TableHeader showActionColumn />
      <tbody>
        {orders.map((order) => (
          <PendingOrder refresh={refresh} key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
}

export function PendingPanel({ refresh, setRefresh }) {
  const period = useMemo(() => {
    const start = new Date(0);
    const end = new Date(new Date().setHours(23, 59, 59, 999));
    return { start, end };
  }, []);

  const orders = useOrders("pending", period, refresh);

  return (
    <div>
      <PendingTable refresh={setRefresh} orders={orders} />
    </div>
  );
}
