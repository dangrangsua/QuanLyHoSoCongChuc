const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Degree ORDER BY D_Qualification_ID DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { D_Qualification_ID, Degree_Name, Major, Grade } = req.body;
        
        const sql = `INSERT INTO Degree (D_Qualification_ID, Degree_Name, Major, Grade) VALUES (?, ?, ?, ?)`;
        await db.query(sql, [D_Qualification_ID, Degree_Name, Major, Grade]);
        
        res.status(201).json({ message: 'Thêm Chi tiết Bằng cấp thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Degree_Name, Major, Grade } = req.body;
        
        const sql = `UPDATE Degree SET Degree_Name=?, Major=?, Grade=? WHERE D_Qualification_ID=?`;
        await db.query(sql, [Degree_Name, Major, Grade, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Degree WHERE D_Qualification_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};