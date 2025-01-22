/**
 * Serviço para gerenciar pedidos no banco de dados.
 */
class OrderService {
  /**
   * Cria uma instância do OrderService.
   * @param {Object} pool - O pool de conexões com o banco de dados.
   */
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * Formata os valores do pedido para inserção no banco de dados.
   * @private
   * @param {Object} order - Objeto contendo os dados do pedido.
   * @param {string} order.owner - Proprietário do pedido.
   * @param {string} order.type - Tipo do pedido.
   * @param {number} order.quantity - Quantidade do pedido.
   * @param {string} order.costCenter - Centro de custo associado ao pedido.
   * @param {string} [order.comments=""] - Comentários adicionais do pedido.
   * @param {number} order.price - Preço do pedido.
   * @param {string} [order.status="pending"] - Status do pedido, pode ser "pending", "approved" ou "rejected".
   * @param {string} order.targetDate - Data alvo para o pedido.
   * @param {string} order.targetPlace - Local alvo para o pedido.
   * @returns {Array} Um array contendo os valores do pedido para inserção na tabela `Orders`.
   */
  #getOrderValues(order) {
    return [
      order.owner,
      order.type,
      order.quantity,
      order.costCenter,
      order.comments || "",
      order.price,
      order.status || "pending",
      order.targetDate,
      order.targetPlace,
    ];
  }

  /**
   * Retorna todos os registros de pedidos.
   * @async
   * @returns {Promise<Array>} Lista de pedidos.
   * @throws {Error} Lança um erro caso falhe ao buscar os pedidos.
   */
  async index() {
    try {
      const [results, _] = await this.pool.query("SELECT * FROM Orders");
      return results;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw new Error("Erro ao buscar pedidos");
    }
  }

  /**
   * Retorna um pedido específico pelo seu ID.
   * @async
   * @param {number} id - O ID do pedido.
   * @returns {Promise<Object>} O pedido com o ID especificado.
   * @throws {Error} Lança um erro caso falhe ao buscar o pedido.
   */
  async show(id) {
    try {
      const [results, _] = await this.pool.query(
        "SELECT * FROM Orders WHERE id=?",
        [id],
      );
      return results;
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      throw new Error("Erro ao buscar pedido");
    }
  }

  /**
   * Cria um novo pedido no banco de dados.
   * @async
   * @param {Object} order - Objeto contendo os dados do pedido a ser inserido.
   * @param {string} order.owner - Proprietário do pedido.
   * @param {string} order.type - Tipo do pedido.
   * @param {number} order.quantity - Quantidade do pedido.
   * @param {string} order.costCenter - Centro de custo associado ao pedido.
   * @param {string} [order.comments=""] - Comentários adicionais do pedido.
   * @param {number} order.price - Preço do pedido.
   * @param {string} [order.status="pending"] - Status do pedido.
   * @param {string} order.targetDate - Data alvo para o pedido.
   * @param {string} order.targetPlace - Local alvo para o pedido.
   * @returns {Promise<Object>} Objeto indicando que a operação foi bem-sucedida. Ex: `{ ok: true }`
   * @throws {Error} Lança um erro caso falhe ao criar o pedido ou realizar a transação.
   */
  async store(order) {
    try {
      await this.pool.execute("START TRANSACTION");

      const query = `
        INSERT INTO Orders (owner, type, quantity, costCenter, comments, price, status, targetDate, targetPlace)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = this.#getOrderValues(order);

      await this.pool.execute(query, values);
      await this.pool.execute("COMMIT");

      return {
        ok: true,
      };
    } catch (error) {
      await this.pool.execute("ROLLBACK");

      console.error("Erro ao criar pedido:", error);
      throw error;
    }
  }

  /**
   * Atualiza o status de um pedido específico.
   * @async
   * @param {number} id - O ID do pedido a ser atualizado.
   * @param {string} status - O novo status do pedido, pode ser "pending", "approved" ou "rejected".
   * @returns {Promise<Object>} Objeto indicando que a operação foi bem-sucedida. Ex: `{ ok: true }`
   * @throws {Error} Lança um erro caso falhe ao atualizar o status do pedido ou realizar a transação.
   */
  async update(id, status) {
    try {
      await this.pool.execute("START TRANSACTION");

      const query = `
        UPDATE Orders SET status=? WHERE id=?
      `;

      await this.pool.execute(query, [status, id]);
      await this.pool.execute("COMMIT");

      return {
        ok: true,
      };
    } catch (error) {
      await this.pool.execute("ROLLBACK");

      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  }

  /**
   * Exclui um pedido específico do banco de dados.
   * @async
   * @param {number} id - O ID do pedido a ser excluído.
   * @returns {Promise<Object>} Objeto indicando que a operação foi bem-sucedida. Ex: `{ ok: true }`
   * @throws {Error} Lança um erro caso falhe ao excluir o pedido ou realizar a transação.
   */
  async delete(id) {
    try {
      await this.pool.execute("START TRANSACTION");

      const query = "DELETE FROM Orders WHERE id=?";
      await this.pool.execute(query, [id]);

      await this.pool.execute("COMMIT");

      return { ok: true };
    } catch (error) {
      await this.pool.execute("ROLLBACK");

      console.error("Erro ao excluir pedido:", error);
      throw error;
    }
  }
}

export default OrderService;
