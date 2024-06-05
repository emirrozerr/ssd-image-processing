const pool = require('../db');

const loadImage = async (req, res) => {
  const { name, path, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "OriginalImage" (Name, Path, User_id) VALUES ($1, $2, $3) RETURNING *',
      [name, path, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const saveModifiedImage = async (req, res) => {
  const { name, path, originalimage_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "ModifiedImage" (Name, Path, Originalimage_id) VALUES ($1, $2, $3) RETURNING *',
      [name, path, originalimage_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  loadImage,
  saveModifiedImage,
};
