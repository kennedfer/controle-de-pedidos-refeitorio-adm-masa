// import * as mysql from "mysql2/promise";


// //! TODO: evitar o hardcoding e usar variaveis de ambiente 
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "pedidos_alibras",
//   password: "pedidos_alibras123",
//   database: "pedidos_alibras",
// });

// //! Isso será feito no docker-compose via 'init.sql' erros simples de indices duplicados podem ser ignorados, por hora

// pool.execute(`
//   CREATE TABLE IF NOT EXISTS Orders (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     owner VARCHAR(255) NOT NULL,
//     type VARCHAR(255) NOT NULL,
//     quantity INT NOT NULL CHECK (quantity >= 1),
//     costCenter VARCHAR(255) NOT NULL,
//     comments VARCHAR(255) DEFAULT '',
//     price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
//     status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
//     targetDate DATE NOT NULL,
//     targetPlace VARCHAR(255) NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );
// `);

// // pool.execute(`
// //   CREATE INDEX idx_status ON Orders(status);
// // `);

// // pool.execute(`
// //   CREATE INDEX idx_status_targetDate ON Orders(status, targetDate);
// // `);

// export default pool;

import * as mysql from "mysql2/promise";

/**
 * Pool de conexão com o banco de dados MySQL.
 * Usado para gerenciar múltiplas conexões de forma eficiente.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_RESTAURANT_ORDERS_USER,
  password: process.env.DB_RESTAURANT_ORDERS_PASSWORD,
  database: process.env.DB_RESTAURANT_ORDERS_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


//! Será movido para o 'init.sql' no docker-compose
(async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        owner VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        quantity INT NOT NULL CHECK (quantity >= 1),
        costCenter VARCHAR(255) NOT NULL,
        comments VARCHAR(255) DEFAULT '',
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
        targetDate DATE NOT NULL,
        targetPlace VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Adicione índices para melhorar o desempenho nas consultas
    // await pool.execute(`
    //   CREATE INDEX IF NOT EXISTS idx_status_targetDate ON Orders(status, targetDate);
    // `);

  } catch (error) {
    console.error("Erro ao criar a tabela ou índices:", error);
  }
})();

export default pool;
