import { useState, useEffect } from "react";
import { PendingTable } from "./PendingTable";
import { LoginDialog } from "./LoginDialog";

export function PendingPanel() {
  const [orders, setOrders] = useState([])
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {

    async function fetchApiData() {
      const response = await fetch(`/api/order?status=pending`);
      const orders = await response.json();

      setOrders(orders)
    }

    fetchApiData();
  }, [refresh])

  return <>
    <div onClick={() => setRefresh(refresh + 1)} className="p-2 ">
      <PendingTable refresh={setRefresh} orders={orders} />
      {/* <LoginDialog/> */}
    </div>
  </>
}