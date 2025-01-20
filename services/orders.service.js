class OrderService {
  constructor(pool) {
    this.pool = pool;
  }

  calculatePrice(type, quantity) {
    const basePrice = 100;
    return basePrice * quantity;
  }

  formatDate(targetDate) {
    // Formate a data para o formato MySQL (YYYY-MM-DD)
    const date = new Date(targetDate);
    return date.toISOString().split('T')[0];
  }

  async index() {
    const [results, fields] = await this.pool.query("SELECT * FROM Orders");
    return results;
  }

  async store(order) {
    try {
      const targetDate = this.formatDate(order.targetDate);

      const query = `
        INSERT INTO Orders (owner, type, quantity, costCenter, comments, price, status, targetDate, targetPlace)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        order.owner,
        order.type,
        order.quantity,
        order.costCenter,
        order.comments || '',
        order.price,
        order.status || 'pending',
        targetDate,
        order.targetPlace,
      ];

      const [result] = await this.pool.execute(query, values);

      return {
        id: result.insertId,
        ...order,
        targetDate,
        status: order.status || 'pending',
      };
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }
}

export default OrderService;
