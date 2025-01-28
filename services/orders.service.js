import { handleError } from "../utils/error";

/**
 * Enum para status válidos de pedidos
 * @readonly
 * @enum {string}
 */
export const OrderStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

/**
 * Classe de serviço para gerenciar pedidos no banco de dados.
 */
class OrderService {
  /** @type {Object} Schema de validação para pedidos */
  static ORDER_SCHEMA = {
    owner: (value) => typeof value === "string" && value.length > 0,
    type: (value) => typeof value === "string" && value.length > 0,
    quantity: (value) => typeof value === "number" && value > 0,
    costCenter: (value) => typeof value === "string" && value.length > 0,
    price: (value) => typeof value === "number" && value >= 0,
    targetDate: (value) => value instanceof Date || !isNaN(Date.parse(value)),
    targetPlace: (value) => typeof value === "string" && value.length > 0,
  };

  /**
   * @param {Object} pool - Pool de conexões com o banco de dados
   */
  constructor(pool) {
    if (!pool) throw new Error("Pool de conexão é obrigatório");
    this.pool = pool;
  }

  /**
   * Executa uma query com tratamento de conexão e transação
   * @private
   * @async
   * @param {Function} operation - Função que executa a operação no banco
   * @param {string} context - Contexto da operação para log de erro
   * @returns {Promise<*>}
   */
  async #executeQuery(operation, context) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      await connection.beginTransaction();

      const result = await operation(connection);
      await connection.commit();

      return result;
    } catch (error) {
      if (connection) await connection.rollback();
      handleError(error, context);
    } finally {
      if (connection) await connection.release();
    }
  }

  /**
   * Valida os dados do pedido
   * @private
   * @param {Object} order - Dados do pedido
   * @throws {Error} Se os dados forem inválidos
   */
  #validateOrder(order) {
    for (const [field, validator] of Object.entries(
      OrderService.ORDER_SCHEMA,
    )) {
      if (!validator(order[field])) {
        throw new Error(`Campo inválido: ${field}`);
      }
    }
  }

  /**
   * Formata data para o formato do banco
   * @private
   * @param {string|Date} date
   * @returns {string}
   */
  #formatDate(date) {
    return new Date(date).toISOString().slice(0, 19).replace("T", " ");
  }

  /**
   * Busca pedidos por período e status
   * @async
   * @param {string} startPeriod - Data inicial (YYYY-MM-DD)
   * @param {string} endPeriod - Data final (YYYY-MM-DD)
   * @param {OrderStatus} orderStatus - Status dos pedidos
   * @returns {Promise<Array>}
   */
  async index(startPeriod, endPeriod, orderStatus) {
    if (!Object.values(OrderStatus).includes(orderStatus)) {
      throw new Error("Status inválido");
    }

    return this.#executeQuery(async (connection) => {
      const query = `
                SELECT * FROM Orders 
                WHERE status = ? 
                AND targetDate BETWEEN ? AND ?
                ORDER BY targetDate DESC
            `;

      const [results] = await connection.query(query, [
        orderStatus,
        this.#formatDate(startPeriod),
        this.#formatDate(endPeriod),
      ]);

      return results;
    }, "busca de pedidos");
  }

  /**
   * Busca um pedido por ID
   * @async
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async show(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("ID inválido");
    }

    return this.#executeQuery(async (connection) => {
      const [results] = await connection.query(
        "SELECT * FROM Orders WHERE id = ?",
        [id],
      );

      if (!results.length) {
        throw new Error(`Pedido ${id} não encontrado`);
      }

      return results[0];
    }, "busca de pedido único");
  }

  /**
   * Cria um novo pedido
   * @async
   * @param {Object} order - Dados do pedido
   * @returns {Promise<Object>}
   */
  async store(order) {
    this.#validateOrder(order);

    return this.#executeQuery(async (connection) => {
      const query = `
                INSERT INTO Orders (
                    owner, type, quantity, costCenter, 
                    comments, price, status, targetDate, targetPlace
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

      const values = [
        order.owner,
        order.type,
        order.quantity,
        order.costCenter,
        order.comments || "",
        order.price,
        order.status || OrderStatus.PENDING,
        this.#formatDate(order.targetDate),
        order.targetPlace,
      ];

      const [result] = await connection.execute(query, values);
      return { ok: true, id: result.insertId };
    }, "criação de pedido");
  }

  /**
   * Atualiza o status de um pedido
   * @async
   * @param {number} id
   * @param {OrderStatus} status
   * @returns {Promise<Object>}
   */
  async update(id, status) {
    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error("Status inválido");
    }

    return this.#executeQuery(async (connection) => {
      const [result] = await connection.execute(
        "UPDATE Orders SET status = ? WHERE id = ?",
        [status, id],
      );

      if (result.affectedRows === 0) {
        throw new Error(`Pedido ${id} não encontrado`);
      }

      return { ok: true, status };
    }, "atualização de pedido");
  }

  /**
   * Remove um pedido
   * @async
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async delete(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("ID inválido");
    }

    return this.#executeQuery(async (connection) => {
      const [result] = await connection.execute(
        "DELETE FROM Orders WHERE id = ?",
        [id],
      );

      if (result.affectedRows === 0) {
        throw new Error(`Pedido ${id} não encontrado`);
      }

      return { ok: true };
    }, "exclusão de pedido");
  }
}

export default OrderService;
