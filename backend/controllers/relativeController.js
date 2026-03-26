const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Relative ORDER BY Relative_ID DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Relative_ID, First_Name, Middle_Name, Last_Name, DOB, ID_Card, Occupation, Current_Address } = req.body;
        
        const sql = `INSERT INTO Relative (Relative_ID, First_Name, Middle_Name, Last_Name, DOB, ID_Card, Occupation, Current_Address) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [Relative_ID, First_Name, Middle_Name, Last_Name, DOB || null, ID_Card || null, Occupation, Current_Address]);
        
        res.status(201).json({ message: 'Thêm Thân nhân thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { First_Name, Middle_Name, Last_Name, DOB, ID_Card, Occupation, Current_Address } = req.body;
        
        const sql = `UPDATE Relative SET First_Name=?, Middle_Name=?, Last_Name=?, DOB=?, ID_Card=?, Occupation=?, Current_Address=? WHERE Relative_ID=?`;
        await db.query(sql, [First_Name, Middle_Name, Last_Name, DOB || null, ID_Card || null, Occupation, Current_Address, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Relative WHERE Relative_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};