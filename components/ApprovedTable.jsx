import { ApprovedOrder } from './ApprovedOrder';

export function ApprovedTable({ orders }) {
  return (
    <table rules="all" className="w-full table-fixed text-xs">
      <thead className='border-b bg-[#fafafa] rounded-xl'>
        <tr>
          <th scope="col">Registrado Por</th>
          <th scope="col">Tipo</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Valor do Pedido</th>
          <th scope="col">Comentários</th>
          <th scope="col">Registrado em</th>
          <th scope="col">Data de entrega</th>
          <th scope="col">Local de Entrega</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <ApprovedOrder key={order._id} order={order} i={i} />
        ))}
      </tbody>
    </table>
  );
}