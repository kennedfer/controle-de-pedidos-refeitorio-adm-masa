import { Button, Classes, Popover, Intent } from "@blueprintjs/core";
import { memo, useState, useCallback } from "react";
import { changeOrderStatus } from "../utils/order";
import PropTypes from "prop-types";

/**
 * Configurações do componente
 */
const ORDER_CONFIG = {
  FORMATS: {
    DATE: "pt-BR",
    CURRENCY: {
      style: "currency",
      currency: "BRL",
    },
  },
  ACTIONS: {
    APPROVE: {
      text: "APROVAR",
      icon: "tick",
      intent: Intent.SUCCESS,
      key: "approved",
    },
    REJECT: {
      text: "REPROVAR",
      icon: "trash",
      intent: Intent.DANGER,
      key: "rejected",
      confirmMessage: "Tem certeza que quer reprovar o pedido?",
    },
  },
  STYLES: {
    ROW: "text-center border-b hover:bg-[#fafafa] duration-300 transition",
    ACTIONS: "whitespace-nowrap",
    COMMENT_BUTTON: "text-xs",
  },
};

/**
 * Componente de botão de comentários
 */
const CommentButton = memo(({ comments }) => (
  <Popover
    interactionKind="click"
    popoverClassName={Classes.POPOVER_CONTENT_SIZING}
    placement="bottom"
    content={<span>{comments || "Pedido sem comentários"}</span>}
  >
    <Button
      intent="primary"
      minimal
      text="Comentários"
      small
      className={ORDER_CONFIG.STYLES.COMMENT_BUTTON}
      aria-label="Ver comentários do pedido"
    />
  </Popover>
));

CommentButton.propTypes = {
  comments: PropTypes.string,
};

/**
 * Componente de confirmação de rejeição
 */
const RejectConfirmation = memo(({ onReject }) => (
  <div className="flex flex-col items-end mt-3">
    <p>{ORDER_CONFIG.ACTIONS.REJECT.confirmMessage}</p>
    <div className="flex mt-3 gap-2">
      <Button className={Classes.POPOVER_DISMISS} text="Cancelar" small />
      <Button
        onClick={onReject}
        intent={ORDER_CONFIG.ACTIONS.REJECT.intent}
        className={Classes.POPOVER_DISMISS}
        text={ORDER_CONFIG.ACTIONS.REJECT.text}
        small
      />
    </div>
  </div>
));

RejectConfirmation.propTypes = {
  onReject: PropTypes.func.isRequired,
};

/**
 * Componente principal de pedido pendente
 */
function PendingOrderComponent({ order, refresh }) {
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

  // Estado de loading por ação
  const [isLoading, setIsLoading] = useState({
    approved: false,
    rejected: false,
  });

  // Formatação de valores
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString(
    ORDER_CONFIG.FORMATS.DATE,
  );

  const formattedPrice = price.toLocaleString(
    ORDER_CONFIG.FORMATS.DATE,
    ORDER_CONFIG.FORMATS.CURRENCY,
  );

  // Handlers de ações
  const handleStatusChange = useCallback(
    async (status) => {
      setIsLoading((prev) => ({ ...prev, [status]: true }));

      try {
        await changeOrderStatus(id, status, refresh);
      } finally {
        setIsLoading((prev) => ({ ...prev, [status]: false }));
      }
    },
    [id, refresh],
  );

  const handleApprove = useCallback(() => {
    handleStatusChange(ORDER_CONFIG.ACTIONS.APPROVE.key);
  }, [handleStatusChange]);

  const handleReject = useCallback(() => {
    handleStatusChange(ORDER_CONFIG.ACTIONS.REJECT.key);
  }, [handleStatusChange]);

  return (
    <tr className={ORDER_CONFIG.STYLES.ROW}>
      <th scope="row">{owner}</th>
      <td>{type}</td>
      <td>{quantity}</td>
      <td>{formattedPrice}</td>
      <td>
        <CommentButton comments={comments} />
      </td>
      <td>{formattedCreatedAt}</td>
      <td>{targetDate}</td>
      <td>{targetPlace}</td>
      <td className={ORDER_CONFIG.STYLES.ACTIONS}>
        <Popover
          interactionKind="click"
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          placement="bottom"
          content={<RejectConfirmation onReject={handleReject} />}
        >
          <Button
            small
            icon={ORDER_CONFIG.ACTIONS.REJECT.icon}
            loading={isLoading.rejected}
            intent={ORDER_CONFIG.ACTIONS.REJECT.intent}
            text={ORDER_CONFIG.ACTIONS.REJECT.text}
            aria-label="Reprovar pedido"
          />
        </Popover>

        <Button
          small
          className="ml-2"
          onClick={handleApprove}
          loading={isLoading.approved}
          intent={ORDER_CONFIG.ACTIONS.APPROVE.intent}
          icon={ORDER_CONFIG.ACTIONS.APPROVE.icon}
          text={ORDER_CONFIG.ACTIONS.APPROVE.text}
          aria-label="Aprovar pedido"
        />
      </td>
    </tr>
  );
}

PendingOrderComponent.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    targetDate: PropTypes.string.isRequired,
    targetPlace: PropTypes.string.isRequired,
    comments: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

// Exporta componente memoizado
export const PendingOrder = memo(PendingOrderComponent);

// Exemplo de uso:
/*
const order = {
    id: 1,
    owner: "João",
    type: "ALMOCO",
    quantity: 2,
    price: 43.50,
    targetDate: "2025-02-01",
    targetPlace: "Sala 1",
    comments: "Sem observações",
    createdAt: "2025-01-28T12:50:26Z"
};

<table>
    <tbody>
        <PendingOrder 
            order={order}
            refresh={() => console.log('Atualizar')}
        />
    </tbody>
</table>
*/
