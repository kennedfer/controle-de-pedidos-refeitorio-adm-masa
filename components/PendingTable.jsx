import { PendingOrder } from "./PendingOrder";
// import { useToast } from "../hooks/Toast.js";

export function PendingTable({ orders, refresh }) {
  // const [Toast, contextHolder] = useToast();

  return (
    <table rules="all" className=" w-full table-auto text-xs">
      {contextHolder}
      <thead className="border-b rounded-lg bg-[#fafafa] rounded-xl">
        <tr>
          <th scope="col">Registrado Por</th>
          <th scope="col">Tipo</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Valor do Pedido</th>
          <th scope="col">Comentários</th>
          <th scope="col">Registrado em</th>
          <th scope="col">Data de entrega</th>
          <th scope="col">Local de Entrega</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <PendingOrder refresh={refresh} key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
}
