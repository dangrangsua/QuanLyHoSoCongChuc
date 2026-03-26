const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Training ORDER BY Start_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { T_Qualification_ID, Trainning_Name, Start_Date, End_Date, Location } = req.body;
        
        const sql = `INSERT INTO Training (T_Qualification_ID, Trainning_Name, Start_Date, End_Date, Location) VALUES (?, ?, ?, ?, ?)`;
        await db.query(sql, [T_Qualification_ID, Trainning_Name, Start_Date || null, End_Date || null, Location]);
        
        res.status(201).json({ message: 'Thêm Khóa đào tạo thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Trainning_Name, Start_Date, End_Date, Location } = req.body;
        
        const sql = `UPDATE Training SET Trainning_Name=?, Start_Date=?, End_Date=?, Location=? WHERE T_Qualification_ID=?`;
        await db.query(sql, [Trainning_Name, Start_Date || null, End_Date || null, Location, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Training WHERE T_Qualification_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};