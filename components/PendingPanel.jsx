import { useMemo } from "react";
import { useOrders } from "../hooks/orders";
import { PendingOrder } from "./PendingOrder";
import { TableHeader } from "./Table";
import PropTypes from "prop-types";
import { Spinner, NonIdealState, Button } from "@blueprintjs/core";

/**
 * Configurações do painel
 */
const PANEL_CONFIG = {
  TABLE: {
    className: "w-full table-auto text-xs border-collapse",
    emptyMessage: "Nenhum pedido pendente encontrado",
    errorMessage: "Erro ao carregar pedidos",
    loadingMessage: "Carregando pedidos...",
  },
  STATUS: "pending",
};

/**
 * Componente de tabela de pedidos pendentes
 */
const PendingTable = ({ orders, refresh, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full p-8 flex justify-center">
        <Spinner size={50} />
        <span className="sr-only">{PANEL_CONFIG.TABLE.loadingMessage}</span>
      </div>
    );
  }

  if (error) {
    return (
      <NonIdealState
        icon="error"
        title={PANEL_CONFIG.TABLE.errorMessage}
        description={error}
        action={
          <Button intent="primary" onClick={() => refresh((prev) => prev + 1)}>
            Tentar novamente
          </Button>
        }
      />
    );
  }

  if (!orders?.length) {
    return (
      <NonIdealState
        icon="inbox"
        title={PANEL_CONFIG.TABLE.emptyMessage}
        action={
          <Button intent="primary" onClick={() => refresh((prev) => prev + 1)}>
            Atualizar
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className={PANEL_CONFIG.TABLE.className}>
        <TableHeader showActionColumn />
        <tbody>
          {orders.map((order) => (
            <PendingOrder refresh={refresh} key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PendingTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  refresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

/**
 * Painel de pedidos pendentes
 */
export function PendingPanel({ refresh, setRefresh }) {
  // Período de busca (desde o início até hoje)
  const period = useMemo(() => {
    const start = new Date(0); // Início do tempo Unix
    const end = new Date();
    end.setHours(23, 59, 59, 999); // Fim do dia atual

    return { start, end };
  }, []);

  // Busca pedidos
  const { orders, isLoading, error } = useOrders(
    PANEL_CONFIG.STATUS,
    period,
    refresh,
  );

  return (
    <div className="p-4 bg-white rounded-lg">
      <PendingTable
        orders={orders}
        refresh={setRefresh}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

PendingPanel.propTypes = {
  refresh: PropTypes.number.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

// Exemplo de uso:
/*
function OrdersPage() {
    const [refresh, setRefresh] = useState(0);

    return (
        <div className="container mx-auto">
            <PendingPanel
                refresh={refresh}
                setRefresh={setRefresh}
            />
        </div>
    );
}
*/
