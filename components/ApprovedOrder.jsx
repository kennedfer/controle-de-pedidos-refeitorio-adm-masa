import { Button, Classes, Popover } from "@blueprintjs/core";

export function ApprovedOrder({ order, i }) {
  const {
    owner,
    type,
    quantity,
    price,
    targetDate,
    targetPlace,
    comments,
    createdAt,
  } = order;

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("pt-BR");
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <tr className="p-5 text-center border-b m-2 hover:bg-[#fafafa] duration-300 transition">
      <th scope="row">{owner}</th>
      <td>{type}</td>
      <td>{quantity}</td>
      <td>{formattedPrice}</td>
      <td>
        <Popover
          interactionKind="click"
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          placement="bottom"
          content={<span>{comments || "Pedido sem comentários"}</span>}
          renderTarget={({ isOpen, ...targetProps }) => (
            <Button
              {...targetProps}
              intent="primary"
              minimal
              text="Comentários"
              small
            />
          )}
        />
      </td>
      <td>{formattedCreatedAt}</td>
      <td>{targetDate}</td>
      <td>{targetPlace}</td>
    </tr>
  );
}
