'use client'

import { useEffect, useState } from "react"
import { PeriodNavigator } from "../../components/PeriodNavigator"
import { OrdersTable } from "../../components/OrdersTable"

function Home() {
  const [orders, setOrders] = useState([])
  const [period, setPeriod] = useState({
    start: new Date(2024, 10, 11),   
    end: new Date(2024, 11, 10) 
  });

  useEffect(() => {
    async function fetchApiData() {
      const {start, end} = period;

      const response = await fetch(`/api/order?start=${start}&end=${end}`);
      const orders = await response.json();

      console.log(orders)
      setOrders(orders)
    }

    fetchApiData();
  }, [period])

  return (
    <main className="w-screen h-screen">
      <div>
        <PeriodNavigator period={period} setPeriod={setPeriod}/>
      </div>

      <div className="p-2">
        <OrdersTable orders={orders}/>
      </div>
    </main>
  )
}

export default Home
