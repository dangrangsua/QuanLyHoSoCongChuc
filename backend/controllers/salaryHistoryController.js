const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Salary_History ORDER BY Start_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Salary_History_ID, Start_Date, End_Date, Step_ID, Employee_ID, Decision_ID } = req.body;
        
        const sql = `INSERT INTO Salary_History (Salary_History_ID, Start_Date, End_Date, Step_ID, Employee_ID, Decision_ID) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [Salary_History_ID, Start_Date || null, End_Date || null, Step_ID, Employee_ID, Decision_ID]);
        
        res.status(201).json({ message: 'Thêm Lịch sử lương thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Start_Date, End_Date, Step_ID, Employee_ID, Decision_ID } = req.body;
        
        const sql = `UPDATE Salary_History SET Start_Date=?, End_Date=?, Step_ID=?, Employee_ID=?, Decision_ID=? WHERE Salary_History_ID=?`;
        await db.query(sql, [Start_Date || null, End_Date || null, Step_ID, Employee_ID, Decision_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Salary_History WHERE Salary_History_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};