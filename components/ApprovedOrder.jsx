import { Button, Classes, Popover, Intent } from "@blueprintjs/core";
import { memo } from "react";
import PropTypes from "prop-types";

/**
 * Configurações do componente
 */
const ORDER_CONFIG = {
  FORMATS: {
    DATE: {
      locale: "pt-BR",
      options: {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    },
    CURRENCY: {
      locale: "pt-BR",
      options: {
        style: "currency",
        currency: "BRL",
      },
    },
  },
  MESSAGES: {
    NO_COMMENTS: "Pedido sem comentários",
  },
  STYLES: {
    ROW: "text-center border-b hover:bg-gray-50 duration-300 transition",
    CELL: "py-3 px-2",
  },
};

/**
 * Componente de botão de comentários
 */
const CommentButton = memo(function CommentButton({ comments }) {
  return (
    <Popover
      interactionKind="click"
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      placement="bottom"
      content={
        <div className="p-2 max-w-xs">
          <span className="text-gray-700">
            {comments || ORDER_CONFIG.MESSAGES.NO_COMMENTS}
          </span>
        </div>
      }
    >
      <Button
        intent={Intent.PRIMARY}
        minimal
        text="Comentários"
        small
        aria-label="Ver comentários do pedido"
        className="text-xs"
      />
    </Popover>
  );
});

CommentButton.propTypes = {
  comments: PropTypes.string,
};

CommentButton.displayName = "CommentButton";

/**
 * Formata um valor monetário
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
const formatCurrency = (value) => {
  return value.toLocaleString(
    ORDER_CONFIG.FORMATS.CURRENCY.locale,
    ORDER_CONFIG.FORMATS.CURRENCY.options,
  );
};

/**
 * Formata uma data
 * @param {string} dateString - String da data
 * @returns {string} Data formatada
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    ORDER_CONFIG.FORMATS.DATE.locale,
    ORDER_CONFIG.FORMATS.DATE.options,
  );
};

/**
 * Componente principal da linha de pedido aprovado
 */
function ApprovedOrderComponent({ order }) {
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

  return (
    <tr className={ORDER_CONFIG.STYLES.ROW} role="row">
      <th scope="row" className={ORDER_CONFIG.STYLES.CELL}>
        {owner}
      </th>
      <td className={ORDER_CONFIG.STYLES.CELL}>{type}</td>
      <td className={ORDER_CONFIG.STYLES.CELL}>{quantity}</td>
      <td className={ORDER_CONFIG.STYLES.CELL}>{formatCurrency(price)}</td>
      <td className={ORDER_CONFIG.STYLES.CELL}>
        <CommentButton comments={comments} />
      </td>
      <td
        className={ORDER_CONFIG.STYLES.CELL}
        title={new Date(createdAt).toLocaleString()}
      >
        {formatDate(createdAt)}
      </td>
      <td className={ORDER_CONFIG.STYLES.CELL}>{targetDate}</td>
      <td className={ORDER_CONFIG.STYLES.CELL}>{targetPlace}</td>
    </tr>
  );
}

ApprovedOrderComponent.propTypes = {
  order: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    targetDate: PropTypes.string.isRequired,
    targetPlace: PropTypes.string.isRequired,
    comments: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

// Exporta componente memoizado
export const ApprovedOrder = memo(ApprovedOrderComponent);

// Exemplo de uso:
/*
const order = {
    owner: "Kenned Ferreira",
    type: "ALMOCO",
    quantity: 2,
    price: 45.90,
    targetDate: "2025-02-01",
    targetPlace: "Sala 1",
    comments: "Pedido especial",
    createdAt: "2025-01-28T13:48:54Z"
};

<table>
    <tbody>
        <ApprovedOrder order={order} />
    </tbody>
</table>
*/
