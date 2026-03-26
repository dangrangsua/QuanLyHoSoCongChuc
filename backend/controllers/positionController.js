const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        // Thêm dấu backtick (`) bọc quanh chữ Position
        const [rows] = await db.query('SELECT * FROM `Position` ORDER BY Position_ID ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Position_ID, Position_Level, Position_Name } = req.body;
        
        // Thêm dấu backtick (`) bọc quanh chữ Position
        const sql = `INSERT INTO \`Position\` (Position_ID, Position_Level, Position_Name) VALUES (?, ?, ?)`;
        await db.query(sql, [Position_ID, Position_Level, Position_Name]);
        
        res.status(201).json({ message: 'Thêm chức vụ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Position_Level, Position_Name } = req.body;
        
        // Thêm dấu backtick (`) bọc quanh chữ Position
        const sql = `UPDATE \`Position\` SET Position_Level=?, Position_Name=? WHERE Position_ID=?`;
        await db.query(sql, [Position_Level, Position_Name, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        // Thêm dấu backtick (`) bọc quanh chữ Position
        await db.query('DELETE FROM \`Position\` WHERE Position_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};