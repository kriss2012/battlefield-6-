import pool from './config/database';

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS game_saves (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        current_scene VARCHAR(255) NOT NULL,
        rage INT DEFAULT 0,
        resolve INT DEFAULT 0,
        skills JSONB DEFAULT '[]',
        item_ids JSONB DEFAULT '[]',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ TABLE CREATED: game_saves');
    process.exit(0);
  } catch (err) {
    console.error('❌ ERROR CREATING TABLE:', err);
    process.exit(1);
  }
};

createTable();
