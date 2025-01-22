import OrderService from "../services/orders.service";
import { handleError } from "../utils/error";
import pool from "./mysql";

// Tabela de preços em centavos
// Melhor precisão para cálculos de preços
const ordersTable = {
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
};

/**
 * Classe responsável por interagir com o serviço de pedidos e gerenciar a lógica de negócios
 * relacionada aos pedidos, como cálculo de preço e validação de dados.
 */
class Database {
  /**
   * Constrói uma instância da classe Database.
   * Inicializa o serviço de pedidos (OrderService).
   */
  constructor() {
    this.orderService = new OrderService(pool);
  }

  /**
   * Valida os dados de um pedido.
   *
   * Verifica se o tipo de pedido é válido e se a quantidade é maior que zero.
   *
   * @private
   * @param {Object} order Objeto de pedido contendo os campos type e quantity.
   * @throws {Error} Lança um erro se o tipo de pedido for inválido ou a quantidade for menor ou igual a zero.
   */
  #validateOrder(order) {
    if (!order.type || !ordersTable[order.type]) {
      throw new Error("Tipo de pedido inválido");
    }
    if (order.quantity <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
  }

  /**
   * Calcula o preço de um pedido com base no tipo e quantidade.
   *
   * @private
   * @param {string} type Tipo de pedido, usado para buscar o preço na tabela de preços.
   * @param {number} quantity Quantidade do pedido.
   * @returns {number} O preço total do pedido.
   * @throws {Error} Lança um erro caso o tipo de pedido seja inválido ou a quantidade seja inválida.
   */
  #calculatePrice(type, quantity) {
    this.#validateOrder({ type, quantity }); // Valida os dados antes de calcular
    return (ordersTable[type] * quantity) / 100;
  }

  /**
   * Retorna uma lista de pedidos com base no período e no status.
   *
   * @async
   * @param {string} startPeriod Data de início para o filtro de pedidos.
   * @param {string} endPeriod Data de fim para o filtro de pedidos.
   * @param {string} orderStatus Status do pedido (por exemplo, 'pendente', 'aprovado').
   * @returns {Promise<Array>} Lista de pedidos filtrados.
   * @throws {Error} Lança um erro se não for possível buscar os pedidos.
   */
  async index(startPeriod, endPeriod, orderStatus) {
    try {
      const orders = await this.orderService.index(
        startPeriod,
        endPeriod,
        orderStatus,
      );
      return orders;
    } catch (error) {
      handleError(error, "buscar pedidos");
    }
  }

  /**
   * Retorna um único pedido com base no ID.
   *
   * @async
   * @param {number} id ID do pedido.
   * @returns {Promise<Object>} Objeto do pedido.
   * @throws {Error} Lança um erro se não for possível buscar o pedido.
   */
  async show(id) {
    try {
      const order = await this.orderService.show(id);
      return order;
    } catch (error) {
      handleError(error, "buscar pedido");
    }
  }

  /**
   * Atualiza o status de um pedido.
   *
   * @async
   * @param {number} id ID do pedido.
   * @param {string} status Novo status do pedido (por exemplo, 'pendente', 'aprovado').
   * @returns {Promise<Object>} Resultado da atualização do pedido.
   * @throws {Error} Lança um erro se não for possível atualizar o pedido.
   */
  async update(id, status) {
    try {
      return await this.orderService.update(id, status);
    } catch (error) {
      handleError(error, "atualizar pedido");
    }
  }

  /**
   * Cria um novo pedido.
   *
   * Calcula o preço do pedido antes de armazená-lo no banco de dados.
   *
   * @async
   * @param {Object} order Objeto contendo os dados do pedido (owner, type, quantity, etc.).
   * @returns {Promise<Object>} Resultado da criação do pedido.
   * @throws {Error} Lança um erro se não for possível criar o pedido.
   */
  async store(order) {
    try {
      order.price = this.#calculatePrice(order.type, order.quantity);
      return await this.orderService.store(order);
    } catch (error) {
      handleError(error, "criar pedido");
    }
  }
}

export default Database;
