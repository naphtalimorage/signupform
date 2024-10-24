import lucia from 'lucia';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: '', // XAMPP default MySQL password
  database: 'signupdb'
});

// Configure Lucia with a custom adapter for MySQL
export const auth = lucia({
  adapter: {
    getUser: async (id) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      return {
        id: rows[0].id,
        passwordHash: rows[0].password
      };
    },
    createUser: async (data) => {
      const { email, passwordHash } = data;
      const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, passwordHash]);
      return {
        id: result.insertId
      };
    },
    // Define other methods as needed (e.g., deleteUser, updateUser)
  },
  sessionExpiresIn: 1000 * 60 * 60 * 24, // 1-day session expiration
  generateKey: () => crypto.randomUUID(), // Generate unique keys
  hash: async (password) => bcrypt.hash(password, 10), // Hash passwords
  compare: async (password, passwordHash) => bcrypt.compare(password, passwordHash), // Compare passwords
});
