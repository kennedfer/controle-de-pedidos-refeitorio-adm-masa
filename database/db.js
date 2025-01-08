import '../database/mongoose';
import { Order } from "../models/order";

// Tabela de preços em centavos
const ordersTable = {
  "APRESENTACAO MUSICAL": 270653,
  "CAFE LITRO": 429,
  "CERVEJA": 2237,
  "CHURRASCO": 6776,
  "COFF I": 1327,
  "COFF II": 1647,
  "COFF III": 1795,
  "DESJEJUM": 2011,
  "DESJEJUM ACAMPAMENTO": 2977,
  "EVENTO": 8323,
  "LANCHE ESPECIAL": 3796,
  "LANCHE TURNO": 1202,
  "PICOLE": 405,
  "JANTAR": 2145,
  "ALMOCO": 2145
};

class Database {
  constructor() {
    // this.orders = fakeData;
  }

  async index(start, end, status) {
    try {
      const orders = await Order.find({
        createdAt: {
          $gte: new Date(start),
          $lt: new Date(end)
        },
        status: {
          "$eq": status
        }
      });
      return orders;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  }

  async show(id) {
    try {
      return await Order.findById(id);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw error;
    }
  }

  async update(id, status) {
    try {
      const order = await this.show(id);
      if (!order) {
        throw new Error('Pedido não encontrado');
      }

      order.status = status;
      await order.save();

      return order;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    }
  }

  async store(order) {
    try {
      const price = this.calculatePrice(order.type, order.quantity);
      const targetDate = this.formatDate(order.targetDate);

      const newOrder = new Order({
        ...order,
        price,
        targetDate
      });

      await newOrder.save();

      return newOrder;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }

  calculatePrice(type, quantity) {
    if (!ordersTable[type]) {
      throw new Error('Tipo de pedido inválido');
    }
    return ordersTable[type] * quantity / 100;
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}

export const db = new Database();