import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { NonIdealState, Spinner } from "@blueprintjs/core";

import { PeriodNavigator } from "./PeriodNavigator";
import { ExcelButton } from "./ExcelButton";
import { ApprovedOrder } from "./ApprovedOrder";
import { TableHeader } from "./Table";

import { exportToExcelFile } from "../utils/excel";
import { useOrders } from "../hooks/orders";

/**
 * Configurações do painel
 */
const PANEL_CONFIG = {
  MESSAGES: {
    EMPTY: "Nenhum pedido aprovado neste período",
    ERROR: "Erro ao carregar pedidos",
    LOADING: "Carregando pedidos...",
  },
  STATUS: "approved",
  STYLES: {
    TABLE: "w-full table-fixed text-xs border-collapse",
    CONTAINER: "flex flex-col gap-6 p-4 bg-white rounded-lg shadow-sm",
    CONTENT: "overflow-x-auto",
  },
};

/**
 * Componente de tabela de pedidos aprovados
 */
const ApprovedTable = memo(function ApprovedTable({ orders }) {
  if (!orders?.length) {
    return (
      <NonIdealState
        icon="inbox"
        title={PANEL_CONFIG.MESSAGES.EMPTY}
        className="py-8"
      />
    );
  }

  return (
    <div className={PANEL_CONFIG.STYLES.CONTENT}>
      <table className={PANEL_CONFIG.STYLES.TABLE}>
        <TableHeader />
        <tbody>
          {orders.map((order) => (
            <ApprovedOrder key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

ApprovedTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

ApprovedTable.displayName = "ApprovedTable";

/**
 * Componente principal do painel de aprovados
 */
export function ApprovedPanel({ period, setPeriod }) {
  // Busca pedidos
  const { orders, isLoading, error, refetch } = useOrders(
    PANEL_CONFIG.STATUS,
    period,
  );

  /**
   * Handler de exportação
   */
  const handleExport = useCallback(async () => {
    try {
      await exportToExcelFile(period, orders);
    } catch (error) {
      console.error("Erro na exportação:", error);
      throw error;
    }
  }, [period, orders]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size={50} />
        <span className="sr-only">{PANEL_CONFIG.MESSAGES.LOADING}</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <NonIdealState
        icon="error"
        title={PANEL_CONFIG.MESSAGES.ERROR}
        description={error}
        action={
          <Button intent="primary" onClick={refetch} text="Tentar novamente" />
        }
      />
    );
  }

  return (
    <div className={PANEL_CONFIG.STYLES.CONTAINER}>
      {/* Navegador de período */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <PeriodNavigator period={period} setPeriod={setPeriod} />
      </div>

      {/* Tabela de pedidos */}
      <ApprovedTable orders={orders} />

      {/* Botão de exportação */}
      <ExcelButton onExport={handleExport} disabled={!orders?.length} />
    </div>
  );
}

ApprovedPanel.propTypes = {
  period: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setPeriod: PropTypes.func.isRequired,
};

// Exemplo de uso:
/*
function OrdersPage() {
    const [period, setPeriod] = useState({
        start: new Date('2025-01-01'),
        end: new Date('2025-01-31')
    });

    return (
        <div className="container mx-auto p-4">
            <ApprovedPanel
                period={period}
                setPeriod={setPeriod}
            />
        </div>
    );
}
*/
