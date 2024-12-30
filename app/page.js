import { Order } from "../components/Order"

function Home() {
  const orders = [
    {
      id:0,
      type: 'churrasco',
      quantity: '10'
    },
    {
      id:1,
      type: 'churrasco',
      quantity: '10'
    },
    ,
    {
      id:2,
      type: 'café',
      quantity: '20'
    },
  ]

  return (
    <main className="w-screen h-screen bg-black">
      <div></div>

      <div className="flex flex-col gap-2 p-2 bg-white h-full">
        {
          orders.map(order => <Order key={order.id} order={order}/>)
        }
      </div>
    </main>
  )
}

export default Home
