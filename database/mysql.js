import * as mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'pedidos_alibras',
  password: 'pedidos_alibras123',
  database: 'pedidos_alibras',
});

pool.execute(`
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
  `)

export default pool;