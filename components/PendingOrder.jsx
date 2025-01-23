import { Button, Classes, Popover } from "@blueprintjs/core";
import { useState } from "react";

export function PendingOrder({ order, refresh, toast }) {
  const {
    owner,
    type,
    quantity,
    price,
    _id,
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

  async function handleClick(status) {
    const newIsLoading = isLoading;
    newIsLoading[status] = true;

    setIsLoading(newIsLoading);

    try {
      const response = await fetch("/api/order/" + _id, {
        method: "PUT",
        body: status,
      });
      const updatedOrder = await response.json();

      if (updatedOrder.status == "approved") {
        toast.success("Pedido aprovado!");
      } else {
        toast.warning("Pedido Reprovado!");
      }

      refresh((prev) => prev + 1);
    } catch (err) {
      toast.error(toast.INTERNET_ERROR_MESSAGE);
    }
  }

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
      <td className="whitespace-nowrap">
        <Popover
          interactionKind="click"
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          placement="bottom"
          content={
            <div key="text">
              <p>Tem certeza que quer reprovar o pedido?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 15,
                }}
              >
                <Button
                  className={Classes.POPOVER_DISMISS}
                  style={{ marginRight: 10 }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleClick("reproved")}
                  intent={"danger"}
                  className={Classes.POPOVER_DISMISS}
                >
                  Reprovar
                </Button>
              </div>
            </div>
          }
          renderTarget={({ isOpen, ...targetProps }) => (
            <Button
              small
              {...targetProps}
              icon="trash"
              loading={isLoading.rejected}
              intent="danger"
            >
              REPROVAR
            </Button>
          )}
        />
        <Button
          small
          className="ml-2"
          onClick={() => handleClick("approved")}
          loading={isLoading.approved}
          intent="success"
          icon="tick"
        >
          APROVAR
        </Button>
      </td>
    </tr>
  );
}
