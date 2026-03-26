const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Qualification ORDER BY Issued_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Qualification_ID, Issued_By, Issued_Date, Quali_Type, Employee_ID } = req.body;
        
        const sql = `INSERT INTO Qualification (Qualification_ID, Issued_By, Issued_Date, Quali_Type, Employee_ID) 
                     VALUES (?, ?, ?, ?, ?)`;
        await db.query(sql, [Qualification_ID, Issued_By, Issued_Date || null, Quali_Type, Employee_ID]);
        
        res.status(201).json({ message: 'Thêm Bằng cấp/Chứng chỉ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Issued_By, Issued_Date, Quali_Type, Employee_ID } = req.body;
        
        const sql = `UPDATE Qualification SET Issued_By=?, Issued_Date=?, Quali_Type=?, Employee_ID=? WHERE Qualification_ID=?`;
        await db.query(sql, [Issued_By, Issued_Date || null, Quali_Type, Employee_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Qualification WHERE Qualification_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};