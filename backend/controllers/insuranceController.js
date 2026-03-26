const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Insurance ORDER BY Issued_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Insurance_ID, Health_CardID, Issued_Date, Expiration_Date, Issued_Place, Employee_ID } = req.body;
        
        const sql = `INSERT INTO Insurance (Insurance_ID, Health_CardID, Issued_Date, Expiration_Date, Issued_Place, Employee_ID) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [Insurance_ID, Health_CardID, Issued_Date || null, Expiration_Date || null, Issued_Place, Employee_ID]);
        
        res.status(201).json({ message: 'Thêm thông tin bảo hiểm thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Health_CardID, Issued_Date, Expiration_Date, Issued_Place, Employee_ID } = req.body;
        
        const sql = `UPDATE Insurance SET Health_CardID=?, Issued_Date=?, Expiration_Date=?, Issued_Place=?, Employee_ID=? WHERE Insurance_ID=?`;
        await db.query(sql, [Health_CardID, Issued_Date || null, Expiration_Date || null, Issued_Place, Employee_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Insurance WHERE Insurance_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};