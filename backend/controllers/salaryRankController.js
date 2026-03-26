const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Salary_Rank ORDER BY Salary_Rank_ID ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Salary_Rank_ID, Rank_Code, Rank_Name } = req.body;
        
        const sql = `INSERT INTO Salary_Rank (Salary_Rank_ID, Rank_Code, Rank_Name) VALUES (?, ?, ?)`;
        await db.query(sql, [Salary_Rank_ID, Rank_Code, Rank_Name]);
        
        res.status(201).json({ message: 'Thêm Ngạch/Bậc lương thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Rank_Code, Rank_Name } = req.body;
        
        const sql = `UPDATE Salary_Rank SET Rank_Code=?, Rank_Name=? WHERE Salary_Rank_ID=?`;
        await db.query(sql, [Rank_Code, Rank_Name, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Salary_Rank WHERE Salary_Rank_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};