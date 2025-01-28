import { Button, Classes, Popover } from "@blueprintjs/core";
import { useState } from "react";
import { changeOrderStatus } from "../utils/order";

export function PendingOrder({ order, refresh }) {
  const {
    owner,
    type,
    quantity,
    price,
    id,
    targetDate,
    targetPlace,
    comments,
    createdAt,
  } = order;

  const [isLoading, setIsLoading] = useState({
    approved: false,
    rejected: false,
  });

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("pt-BR");
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Funções de manipulação
  const handleApprove = async () => {
    setIsLoading((prev) => ({ ...prev, approved: true }));
    await changeOrderStatus(id, "approved", refresh);
    setIsLoading((prev) => ({ ...prev, approved: false }));
  };

  const handleReject = async () => {
    setIsLoading((prev) => ({ ...prev, rejected: true }));
    await changeOrderStatus(id, "rejected", refresh);
    setIsLoading((prev) => ({ ...prev, rejected: false }));
  };

  return (
    <tr className="text-center border-b hover:bg-[#fafafa] duration-300 transition">
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
        >
          <Button intent="primary" minimal text="Comentários" small />
        </Popover>
      </td>
      <td>{formattedCreatedAt}</td>
      <td>{targetDate}</td>
      <td>{targetPlace}</td>
      <td className="whitespace-nowrap">
        <Popover
          interactionKind="click"
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          placement="bottom"
          content={
            <div className="flex flex-col items-end mt-3">
              <p>Tem certeza que quer reprovar o pedido?</p>
              <div className="flex mt-3">
                <Button
                  className={Classes.POPOVER_DISMISS}
                  style={{ marginRight: 10 }}
                  text="Cancelar"
                />
                <Button
                  onClick={handleReject}
                  intent="danger"
                  className={Classes.POPOVER_DISMISS}
                  text="Reprovar"
                />
              </div>
            </div>
          }
        >
          <Button
            small
            icon="trash"
            loading={isLoading.rejected}
            intent="danger"
            text="REPROVAR"
          />
        </Popover>
        <Button
          small
          className="ml-2"
          onClick={handleApprove}
          loading={isLoading.approved}
          intent="success"
          icon="tick"
          text="APROVAR"
        />
      </td>
    </tr>
  );
}
