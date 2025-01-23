import { useState, useMemo, useEffect } from "react";
import { PendingTable } from "./PendingTable";
import { useOrders } from "../hooks/orders";

export function PendingPanel() {
  const period = useMemo(
    () => ({
      start: new Date(0),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
    []
  );

  const [refresh, setRefresh] = useState(0);
  const orders = useOrders("pending", period, refresh);

  return (
    <div>
      <PendingTable refresh={setRefresh} orders={orders} />
    </div>
  );
}
