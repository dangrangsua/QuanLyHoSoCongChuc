const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Employee_Relative ORDER BY Employee_ID ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Employee_ID, Relative_ID, Relationship } = req.body;
        
        const sql = `INSERT INTO Employee_Relative (Employee_ID, Relative_ID, Relationship) VALUES (?, ?, ?)`;
        await db.query(sql, [Employee_ID, Relative_ID, Relationship]);
        
        res.status(201).json({ message: 'Thêm Mối quan hệ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        // Lấy cả 2 mã từ URL
        const { empId, relId } = req.params;
        const { Relationship } = req.body;
        
        const sql = `UPDATE Employee_Relative SET Relationship=? WHERE Employee_ID=? AND Relative_ID=?`;
        await db.query(sql, [Relationship, empId, relId]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        // Lấy cả 2 mã từ URL
        const { empId, relId } = req.params;
        await db.query('DELETE FROM Employee_Relative WHERE Employee_ID=? AND Relative_ID=?', [empId, relId]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};