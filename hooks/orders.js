import { useState, useEffect, useMemo } from "react";

/**
 * Hook para buscar pedidos da API com base no status e no período fornecidos.
 *
 * @param {string} status - Status dos pedidos a serem buscados.
 * @param {null | Object} [period={ start: new Date(0), end: new Date(new Date().setHours(23, 59, 59, 999)) }] - Período de tempo para filtrar os pedidos (pode ser omitido para receber todos os pedidos).
 * @param {Date} period.start - Data de início do período.
 * @param {Date} period.end - Data de término do período.
 * @returns {Array} Lista de pedidos.
 */
export function useOrders(
  status,
  period = {
    start: new Date(0),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  },
) {
  const [orders, setOrders] = useState([]);

  //Garante que o estado de orders seja atualizado APENAS quando o status ou o período mudarem
  const memoizedStatus = useMemo(() => status, [status]);
  const memoizedPeriod = useMemo(() => period, [period.start, period.end]);

  useEffect(() => {
    async function fetchApiData() {
      const { start, end } = memoizedPeriod;

      try {
        const response = await fetch(
          `/api/order?status=${memoizedStatus}&start=${start.getTime()}&end=${end.getTime()}`,
        );
        if (!response.ok) {
          throw new Error("Erro ao requisitar pedidos");
        }
        const orders = await response.json();
        setOrders(orders);
      } catch (error) {
        handleError(error, "requisição de Pedidos 'useOrders'");
        setOrders([]);
      }
    }

    fetchApiData();
  }, [memoizedStatus, memoizedPeriod]);

  return orders;
}
