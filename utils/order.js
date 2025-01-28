import { handleError } from "./error";
import { Toaster } from "./toast";

/**
 * Constantes para status de pedidos
 * @readonly
 * @enum {string}
 */
export const ORDER_STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
};

/**
 * Mensagens de feedback para o usuário
 * @readonly
 * @enum {string}
 */
const MESSAGES = {
  APPROVED: "Pedido aprovado com sucesso!",
  REJECTED: "Pedido reprovado.",
  ERROR: {
    NETWORK: "Erro: Verifique sua conexão de internet",
    INVALID_STATUS: "Status inválido para o pedido",
    INVALID_ID: "ID do pedido inválido",
    UPDATE_FAILED: "Falha ao atualizar o pedido",
  },
};

/**
 * Atualiza o status de um pedido e exibe uma mensagem correspondente.
 *
 * @async
 * @param {string|number} orderId - O ID do pedido a ser atualizado
 * @param {ORDER_STATUS} status - O novo status do pedido
 * @param {Function} refresh - Função para atualizar a interface
 * @returns {Promise<Object>} Dados do pedido atualizado
 * @throws {Error} Se houver falha na atualização
 */
export const changeOrderStatus = async (orderId, status, refresh) => {
  // Validação de parâmetros
  if (!orderId) {
    Toaster.danger(MESSAGES.ERROR.INVALID_ID);
    throw new Error(MESSAGES.ERROR.INVALID_ID);
  }

  if (!Object.values(ORDER_STATUS).includes(status)) {
    Toaster.danger(MESSAGES.ERROR.INVALID_STATUS);
    throw new Error(MESSAGES.ERROR.INVALID_STATUS);
  }

  try {
    // Configuração da requisição
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
        "X-Requested-With": "XMLHttpRequest",
        "X-User": "kennedfer", // Usuário atual
        "Cache-Control": "no-cache",
      },
      body: status,
    };

    // Realiza a requisição
    const response = await fetch(`/api/order/${orderId}`, requestOptions);

    // Verifica resposta
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || `${MESSAGES.ERROR.UPDATE_FAILED}: ${response.status}`,
      );
    }

    // Processa resposta
    const updatedOrder = await response.json();

    // Validação da resposta
    if (!updatedOrder || typeof updatedOrder.status !== "string") {
      throw new Error(MESSAGES.ERROR.UPDATE_FAILED);
    }

    // Feedback ao usuário
    if (updatedOrder.status === ORDER_STATUS.APPROVED) {
      Toaster.success(MESSAGES.APPROVED);
    } else if (updatedOrder.status === ORDER_STATUS.REJECTED) {
      Toaster.warning(MESSAGES.REJECTED);
    }

    // Atualiza interface
    if (typeof refresh === "function") {
      refresh((prev) => prev + 1);
    }

    return updatedOrder;
  } catch (error) {
    // Log do erro
    console.error("Erro na atualização do pedido:", {
      orderId,
      status,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    // Tratamento específico do erro
    if (error.name === "TypeError") {
      Toaster.danger(MESSAGES.ERROR.NETWORK);
    } else {
      handleError(error, "atualização de status de pedido");
    }

    throw error;
  }
};

/**
 * Hook personalizado para gerenciar estados de loading
 * @param {Function} callback - Função a ser executada
 * @returns {[Function, boolean]} Função decorada e estado de loading
 */
export const useLoadingState = (callback) => {
  const [isLoading, setIsLoading] = useState(false);

  const wrappedCallback = async (...args) => {
    setIsLoading(true);
    try {
      await callback(...args);
    } finally {
      setIsLoading(false);
    }
  };

  return [wrappedCallback, isLoading];
};

// Exemplo de uso:
/*
// Com hook de loading
const [updateOrder, isUpdating] = useLoadingState(async (orderId, status) => {
    await changeOrderStatus(orderId, status, refresh);
});

// Uso básico
try {
    await changeOrderStatus(
        '123', 
        ORDER_STATUS.APPROVED, 
        () => console.log('Atualizado!')
    );
} catch (error) {
    console.error('Falha na atualização:', error);
}
*/
