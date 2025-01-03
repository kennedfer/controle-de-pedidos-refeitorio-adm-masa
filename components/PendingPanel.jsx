import { useState, useEffect} from "react";
import { PendingTable } from "./PendingTable";

export function PendingPanel(){
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function fetchApiData() {
          const response = await fetch(`/api/order?status=pending`);
          const orders = await response.json();
    
          console.log(orders)
          setOrders(orders)
        }
    
        fetchApiData();
      }, [refresh])

    return <>
        <div onClick={()=> setRefresh(refresh+1)} className="p-2 pointer-events-none">
            <PendingTable refresh={setRefresh} orders={orders}/>
        </div>
    </>
}