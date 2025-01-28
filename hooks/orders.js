import { useState, useEffect } from "react";

/**
 * Hook customizado para buscar e gerenciar uma lista de pedidos com base no status, período e um gatilho de atualização.
 *
 * @param {string} status - O status dos pedidos a serem filtrados.
 * @param {Object} period - Objeto representando o período de tempo para a busca dos pedidos.
 * @param {Date} period.start - Data de início do período.
 * @param {Date} period.end - Data de término do período.
 * @param {number} refresh - Um contador ou gatilho que força a atualização dos pedidos.
 * @returns {Array<Object>} Retorna uma lista de pedidos obtidos da API.
 */
export function useOrders(status, period, refresh) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchApiData() {
      const { start, end } = period;

      try {
        const response = await fetch(
          `/api/order?status=${status}&start=${start.getTime()}&end=${end.getTime()}`
        );
        if (!response.ok) throw new Error("Erro ao requisitar pedidos");

        const orders = await response.json();
        if (isMounted) setOrders(orders);
      } catch (error) {
        if (isMounted) setOrders([]);
        console.error("Erro ao requisitar pedidos:", error);
      }
    }

    fetchApiData();

    return () => {
      isMounted = false;
    };
  }, [status, period.start, period.end, refresh]);

  return orders;
}
