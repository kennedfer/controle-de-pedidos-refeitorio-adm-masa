'use client'

import { useEffect, useState } from "react"
import { Order } from "../../components/Order"
import { PeriodNavigator } from "../../components/PeriodNavigator"

function Home() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchApiData() {
      const response = await fetch("/api/order");
      const orders = await response.json();

      console.log(orders)
      setOrders(orders)
    }

    fetchApiData();
  }, [])

  return (
    <main className="w-screen h-screen">
      <div>
        <PeriodNavigator />
      </div>

      <table rules="all" className="w-full table-auto border">
        <thead>
          <tr>
            <th scope="col">Solicitado Por</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor do Pedido</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => <Order key={order.id} order={order} />)
          }
        </tbody>
      </table>
    </main>
  )
}

export default Home
