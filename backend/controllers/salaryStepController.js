const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Salary_Step ORDER BY Step_ID ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Step_ID, Coefficient, Salary_Rank_ID } = req.body;
        
        const sql = `INSERT INTO Salary_Step (Step_ID, Coefficient, Salary_Rank_ID) VALUES (?, ?, ?)`;
        await db.query(sql, [Step_ID, Coefficient || null, Salary_Rank_ID]);
        
        res.status(201).json({ message: 'Thêm Bậc lương thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Coefficient, Salary_Rank_ID } = req.body;
        
        const sql = `UPDATE Salary_Step SET Coefficient=?, Salary_Rank_ID=? WHERE Step_ID=?`;
        await db.query(sql, [Coefficient || null, Salary_Rank_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Salary_Step WHERE Step_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};