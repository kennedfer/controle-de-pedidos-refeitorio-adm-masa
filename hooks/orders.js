import { useState, useEffect } from "react";

/**
 * Hook customizado para buscar e gerenciar lista de pedidos
 * @param {string} status - Status dos pedidos a serem filtrados
 * @param {Object} period - Período de busca
 * @param {Date} period.start - Data inicial
 * @param {Date} period.end - Data final
 * @param {number} refresh - Gatilho de atualização
 * @returns {Object} Estado dos pedidos e funções de controle
 */
export function useOrders(status, period, refresh) {
  // Estados
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar dados
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validação básica
      if (!status || !period.start || !period.end) {
        throw new Error("Parâmetros inválidos");
      }

      // Prepara URL
      const params = new URLSearchParams({
        status: status,
        start: period.start.getTime(),
        end: period.end.getTime(),
      });

      // Faz a requisição
      const response = await fetch(`/api/order?${params}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Erro:", error);
      setError(error.message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para recarregar dados
  const reload = () => {
    fetchOrders();
  };

  // Effect para buscar dados
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        if (isMounted) {
          console.error("Erro no effect:", error);
        }
      }
    };

    loadData();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [status, period.start, period.end, refresh]);

  // Retorna dados e funções úteis
  return {
    orders,
    isLoading,
    error,
    reload,
  };
}

// Exemplo de uso simplificado:
/*
function OrdersList() {
    const [refresh, setRefresh] = useState(0);

    const period = {
        start: new Date('2025-01-01'),
        end: new Date('2025-01-31')
    };

    const { orders, isLoading, error, reload } = useOrders(
        'pending',
        period,
        refresh
    );

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Erro: {error}</p>
                <button onClick={reload}>Tentar novamente</button>
            </div>
        );
    }

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    {order.title}
                </div>
            ))}
            <button onClick={() => setRefresh(prev => prev + 1)}>
                Atualizar
            </button>
        </div>
    );
}
*/
