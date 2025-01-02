import { useState, useEffect} from "react";
import { OrdersTable } from "./OrdersTable";
import { PeriodNavigator } from "./PeriodNavigator";

export function ApprovedPanel({period, setPeriod}){
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchApiData() {
          const response = await fetch(`/api/order`);
          const orders = await response.json();
    
          console.log(orders)
          setOrders(orders)
        }
    
        fetchApiData();
      }, [])

    return <>
        <div>
            <PeriodNavigator period={period} setPeriod={setPeriod}/>
        </div>

        <div className="p-2">
            <OrdersTable orders={orders}/>
        </div>
    </>
}