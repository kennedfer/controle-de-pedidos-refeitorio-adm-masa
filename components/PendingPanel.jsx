import { useState, useMemo } from "react";
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

  const orders = useOrders("pending", period);
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div onClick={() => setRefresh(refresh + 1)} className="p-2 ">
        <PendingTable refresh={setRefresh} orders={orders} />
      </div>
    </>
  );
}
