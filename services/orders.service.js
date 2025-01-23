import { handleError } from "../utils/error";

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
    const targetDate = order.targetDate.replace("T", " ").replace("Z", "");

    return [
      order.owner,
      order.type,
      order.quantity,
      order.costCenter,
      order.comments || "",
      order.price,
      order.status || "pending",
      targetDate,
      order.targetPlace,
    ];
  }

  /**
   * Retorna todos os registros de pedidos dentro de um intervalo de datas e status específicos.
   *
   * Este método permite filtrar os pedidos pela coluna `status` e por um intervalo de datas (`targetDate`),
   * retornando apenas os pedidos que atendem a esses critérios.
   *
   * @async
   * @param {string} orderStatus - O status dos pedidos a serem buscados. Pode ser "pending", "approved" ou "rejected".
   * @param {string} startPeriod - A data de início do intervalo de tempo (inclusiva). Formato: 'YYYY-MM-DD'.
   * @param {string} endPeriod - A data final do intervalo de tempo (exclusiva). Formato: 'YYYY-MM-DD'.
   * @returns {Promise<Array>} Retorna uma lista de pedidos que atendem aos critérios de filtro.
   * @throws {Error} Lança um erro caso falhe ao buscar os pedidos ou realizar a consulta.
   */
  async index(startPeriod, endPeriod, orderStatus) {
    let connection;

    try {
      connection = await this.pool.getConnection();
      const values = [orderStatus, startPeriod, endPeriod];

      const [results, _] = await connection.query(
        `
        SELECT * FROM orders
        WHERE status = ?
          AND targetDate > FROM_UNIXTIME(? / 1000)
          AND targetDate < FROM_UNIXTIME(? / 1000);`,
        values,
      );

      return results;
    } catch (error) {
      handleError(error, "busca de pedidos");
    } finally {
      if (connection) connection.release();
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
    let connection;

    try {
      connection = await this.pool.getConnection();

      const [results, _] = await connection.query(
        "SELECT * FROM Orders WHERE id=?",
        [id],
      );
      return results;
    } catch (error) {
      handleError(error, "busca de pedido único");
    } finally {
      if (connection) connection.release();
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
    let connection;

    try {
      connection = await this.pool.getConnection();
      await connection.beginTransaction();

      const query = `
        INSERT INTO Orders (owner, type, quantity, costCenter, comments, price, status, targetDate, targetPlace)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = this.#getOrderValues(order);

      await connection.execute(query, values);
      await connection.commit();

      return {
        ok: true,
      };
    } catch (error) {
      if (connection) await connection.rollback();

      handleError(error, "criação de pedido");
    } finally {
      if (connection) connection.release();
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
    let connection;
    try {
      connection = await this.pool.getConnection();
      await connection.beginTransaction();

      const query = `
        UPDATE Orders SET status=? WHERE id=?
      `;

      await connection.execute(query, [status, id]);
      await connection.commit();

      return {
        ok: true,
        status,
      };
    } catch (error) {
      if (connection) await connection.rollback();

      handleError(error, "atualização de pedido");
    } finally {
      if (connection) connection.release();
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
    let connection;

    try {
      connection = this.pool.getConnection();
      await connection.beginTransaction();

      const query = "DELETE FROM Orders WHERE id=?";
      await connection.execute(query, [id]);

      await connection.commit();

      return { ok: true };
    } catch (error) {
      if (connection) await connection.rollback();

      console.error("Erro ao excluir pedido:", error);
      throw error;
    } finally {
      if (connection) await connection.release();
    }
  }
}

export default OrderService;
