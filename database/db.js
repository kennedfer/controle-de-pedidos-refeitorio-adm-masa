import OrderService from "../services/orders.service";
import { handleError } from "../utils/error";
import pool from "./mysql";

/**
 * Enums para status de pedidos
 * @readonly
 */
export const ORDER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

/**
 * Configuração dos tipos de pedidos e seus preços
 * @readonly
 */
const ORDERS_CONFIG = {
  PRICES: {
    "APRESENTACAO MUSICAL": 270653,
    "CAFE LITRO": 429,
    CERVEJA: 2237,
    CHURRASCO: 6776,
    "COFF I": 1327,
    "COFF II": 1647,
    "COFF III": 1795,
    DESJEJUM: 2011,
    "DESJEJUM ACAMPAMENTO": 2977,
    EVENTO: 8323,
    "LANCHE ESPECIAL": 3796,
    "LANCHE TURNO": 1202,
    PICOLE: 405,
    JANTAR: 2145,
    ALMOCO: 2145,
  },
  LIMITS: {
    MAX_QUANTITY: 1000,
    MIN_QUANTITY: 1,
  },
};

/**
 * Classe para gerenciamento de pedidos no banco de dados
 */
class Database {
  #orderService;

  constructor() {
    this.#orderService = new OrderService(pool);
  }

  /**
   * Formata um valor monetário
   * @private
   * @param {number} value - Valor em centavos
   * @returns {number} Valor em reais com 2 casas decimais
   */
  #formatPrice(value) {
    return Number((value / 100).toFixed(4));
  }

  /**
   * Valida os dados de um pedido
   * @private
   * @param {Object} order - Dados do pedido
   * @throws {Error} Se os dados forem inválidos
   */
  #validateOrder(order) {
    if (!order.type || !ORDERS_CONFIG.PRICES[order.type]) {
      throw new Error(`Tipo de pedido inválido: ${order.type}`);
    }

    if (!Number.isInteger(order.quantity)) {
      throw new Error("Quantidade deve ser um número inteiro");
    }

    if (order.quantity < ORDERS_CONFIG.LIMITS.MIN_QUANTITY) {
      throw new Error("Quantidade deve ser maior que zero");
    }

    if (order.quantity > ORDERS_CONFIG.LIMITS.MAX_QUANTITY) {
      throw new Error(
        `Quantidade não pode exceder ${ORDERS_CONFIG.LIMITS.MAX_QUANTITY}`,
      );
    }

    // Validação de campos obrigatórios
    const requiredFields = ["owner", "costCenter", "targetDate", "targetPlace"];
    for (const field of requiredFields) {
      if (!order[field]) {
        throw new Error(`Campo obrigatório não informado: ${field}`);
      }
    }
  }

  /**
   * Calcula o preço total do pedido
   * @private
   * @param {string} type - Tipo do pedido
   * @param {number} quantity - Quantidade
   * @returns {number} Preço calculado
   */
  #calculatePrice(type, quantity) {
    this.#validateOrder({ type, quantity });
    return this.#formatPrice(ORDERS_CONFIG.PRICES[type] * quantity);
  }

  /**
   * Formata um pedido para o banco
   * @private
   * @param {Object} order - Dados do pedido
   * @returns {Object} Pedido formatado
   */
  #formatOrder(order) {
    return {
      ...order,
      price: this.#calculatePrice(order.type, order.quantity),
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Busca pedidos filtrados
   * @async
   * @param {string} startPeriod - Data inicial
   * @param {string} endPeriod - Data final
   * @param {ORDER_STATUS} orderStatus - Status dos pedidos
   * @returns {Promise<Array>} Lista de pedidos
   */
  async index(startPeriod, endPeriod, orderStatus) {
    try {
      if (!startPeriod || !endPeriod || !orderStatus) {
        throw new Error("Parâmetros de busca inválidos");
      }

      const orders = await this.#orderService.index(
        startPeriod,
        endPeriod,
        orderStatus,
      );

      return orders;
    } catch (error) {
      handleError(error, "buscar pedidos");
      throw error; // Propaga o erro
    }
  }

  /**
   * Busca um pedido específico
   * @async
   * @param {number} id - ID do pedido
   * @returns {Promise<Object>} Dados do pedido
   */
  async show(id) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID inválido");
      }

      const order = await this.#orderService.show(id);

      if (!order) {
        throw new Error(`Pedido ${id} não encontrado`);
      }

      return order;
    } catch (error) {
      handleError(error, "buscar pedido");
      throw error;
    }
  }

  /**
   * Atualiza status do pedido
   * @async
   * @param {number} id - ID do pedido
   * @param {ORDER_STATUS} status - Novo status
   * @returns {Promise<Object>} Resultado da atualização
   */
  async update(id, status) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID inválido");
      }

      if (!Object.values(ORDER_STATUS).includes(status)) {
        throw new Error("Status inválido");
      }

      return await this.#orderService.update(id, status);
    } catch (error) {
      handleError(error, "atualizar pedido");
      throw error;
    }
  }

  /**
   * Cria novo pedido
   * @async
   * @param {Object} orderData - Dados do pedido
   * @returns {Promise<Object>} Resultado da criação
   */
  async store(orderData) {
    try {
      // Validação completa
      this.#validateOrder(orderData);

      // Formatação do pedido
      const order = this.#formatOrder(orderData);

      return await this.#orderService.store(order);
    } catch (error) {
      handleError(error, "criar pedido");
      throw error;
    }
  }
}

export const db = new Database();

// Exemplo de uso:
/*
try {
    // Criar pedido
    const newOrder = await db.store({
        owner: 'João',
        type: 'ALMOCO',
        quantity: 2,
        costCenter: '123',
        targetDate: '2025-01-28',
        targetPlace: 'Sala 1'
    });

    // Buscar pedidos
    const orders = await db.index(
        '2025-01-01',
        '2025-01-31',
        ORDER_STATUS.PENDING
    );

    // Atualizar status
    await db.update(1, ORDER_STATUS.APPROVED);

} catch (error) {
    console.error('Erro:', error.message);
}
*/
