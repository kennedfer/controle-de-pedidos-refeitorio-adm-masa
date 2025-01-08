import { useState} from "react";
import { PendingTable } from "./PendingTable";
import { useOrders } from "../hooks/orders";

export function PendingPanel() {
  const orders = useOrders("pending");
  const [refresh, setRefresh] = useState(0);

  return <>
    <div onClick={() => setRefresh(refresh + 1)} className="p-2 ">
      <PendingTable refresh={setRefresh} orders={orders} />
    </div>
  </>
}