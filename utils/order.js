import { handleError } from './error';
import { Toaster } from './toast';

/**
 * Atualiza o status de um pedido e exibe uma mensagem correspondente.
 *
 * @async
 * @function changeOrderStatus
 * @param {string} orderId - O ID do pedido a ser atualizado.
 * @param {string} status - O novo status do pedido.
 * @param {Function} refresh - Função para atualizar a interface do usuário.
 * @returns {Promise<void>} Uma Promise que resolve quando a operação é concluída.
 */
export const changeOrderStatus = async (orderId, status, refresh) => {
  try {
    console.log(orderId);

    const response = await fetch(`/api/order/${orderId}`, {
      method: "PUT",
      body: status,
      headers: {
        "Content-Type": "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o pedido: ${response.statusText}`);
    }

    const updatedOrder = await response.json();

    if (updatedOrder.status === "approved") {
      Toaster.success("Pedido aprovado!");
    } else {
      Toaster.warning("Pedido Reprovado!");
    }

    refresh((prev) => prev + 1);
  } catch (err) {
    handleError(err);
    Toaster.danger("Erro: Verifique sua conexão de internet");
  }
};
