import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de conexões MySQL configurado com variáveis de ambiente
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'boutique_crm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Função para testar conectividade com o banco
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('✅ Conexão com o banco MySQL estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.warn('⚠️ Não foi possível conectar ao banco MySQL. O sistema utilizará dados demonstrativos.', error);
    return false;
  }
}
