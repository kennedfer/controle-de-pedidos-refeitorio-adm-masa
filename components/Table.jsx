export const TableHeader = ({ showActionColumn }) => (
  <thead className="border-b border-t rounded-lg bg-[#fafafa] rounded-xl">
    <tr>
      <th scope="col">Registrado Por</th>
      <th scope="col">Tipo</th>
      <th scope="col">Quantidade</th>
      <th scope="col">Valor do Pedido</th>
      <th scope="col">Comentários</th>
      <th scope="col">Registrado em</th>
      <th scope="col">Data de entrega</th>
      <th scope="col">Local de Entrega</th>
      {showActionColumn && <th scope="col">Ação</th>}
    </tr>
  </thead>
);
