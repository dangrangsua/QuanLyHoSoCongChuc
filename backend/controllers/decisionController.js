const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Decision ORDER BY Sign_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        // Hứng chuẩn 6 biến từ bảng của ba
        const { Decision_ID, Effective_Date, Sign_Date, Decision_Number, Decision_Type, Signer } = req.body;
        
        const sql = `INSERT INTO Decision 
            (Decision_ID, Effective_Date, Sign_Date, Decision_Number, Decision_Type, Signer) 
            VALUES (?, ?, ?, ?, ?, ?)`;
            
        await db.query(sql, [Decision_ID, Effective_Date || null, Sign_Date || null, Decision_Number, Decision_Type, Signer]);
        
        res.status(201).json({ message: 'Thêm quyết định thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Effective_Date, Sign_Date, Decision_Number, Decision_Type, Signer } = req.body;
        
        const sql = `UPDATE Decision SET 
            Effective_Date=?, Sign_Date=?, Decision_Number=?, Decision_Type=?, Signer=? 
            WHERE Decision_ID=?`;
            
        await db.query(sql, [Effective_Date || null, Sign_Date || null, Decision_Number, Decision_Type, Signer, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Decision WHERE Decision_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};