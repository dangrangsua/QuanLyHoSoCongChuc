const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM WorkHistory ORDER BY Start_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        // Chỉ còn 7 trường
        const { WorkHistory_ID, Start_Date, End_Date, Employee_ID, Department_ID, Decision_ID, Position_ID } = req.body;
        
        const sql = `INSERT INTO WorkHistory 
            (WorkHistory_ID, Start_Date, End_Date, Employee_ID, Department_ID, Decision_ID, Position_ID) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
                     
        await db.query(sql, [WorkHistory_ID, Start_Date, End_Date, Employee_ID, Department_ID, Decision_ID, Position_ID]);
        res.status(201).json({ message: 'Thêm thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Start_Date, End_Date, Employee_ID, Department_ID, Decision_ID, Position_ID } = req.body;
        
        const sql = `UPDATE WorkHistory SET 
            Start_Date=?, End_Date=?, Employee_ID=?, Department_ID=?, Decision_ID=?, Position_ID=? 
            WHERE WorkHistory_ID=?`;
                     
        await db.query(sql, [Start_Date, End_Date, Employee_ID, Department_ID, Decision_ID, Position_ID, id]);
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM WorkHistory WHERE WorkHistory_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};