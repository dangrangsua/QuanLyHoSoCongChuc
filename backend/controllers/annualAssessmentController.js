const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Annual_Assessment ORDER BY Issued_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Assessment_ID, Issued_Date, On_Period, Rating, Employee_ID } = req.body;
        
        const sql = `INSERT INTO Annual_Assessment (Assessment_ID, Issued_Date, On_Period, Rating, Employee_ID) 
                     VALUES (?, ?, ?, ?, ?)`;
        await db.query(sql, [Assessment_ID, Issued_Date || null, On_Period, Rating, Employee_ID]);
        
        res.status(201).json({ message: 'Thêm phiếu đánh giá thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Issued_Date, On_Period, Rating, Employee_ID } = req.body;
        
        const sql = `UPDATE Annual_Assessment SET Issued_Date=?, On_Period=?, Rating=?, Employee_ID=? WHERE Assessment_ID=?`;
        await db.query(sql, [Issued_Date || null, On_Period, Rating, Employee_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Annual_Assessment WHERE Assessment_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};