const pool = require('../db');

const getProcessHistory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "ProcessHistory"');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProcessHistory,
};
