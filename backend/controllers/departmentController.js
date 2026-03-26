const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Department ORDER BY Department_ID ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Department_ID, Dept_Name, Email } = req.body;
        
        const sql = `INSERT INTO Department (Department_ID, Dept_Name, Email) VALUES (?, ?, ?)`;
        await db.query(sql, [Department_ID, Dept_Name, Email]);
        
        res.status(201).json({ message: 'Thêm phòng ban thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Dept_Name, Email } = req.body;
        
        const sql = `UPDATE Department SET Dept_Name=?, Email=? WHERE Department_ID=?`;
        await db.query(sql, [Dept_Name, Email, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Department WHERE Department_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};