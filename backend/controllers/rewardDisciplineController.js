const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Reward_Discipline ORDER BY Issued_Date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { Reward_Discipline_ID, In_Form, Issued_Date, Which_Type, Reason, Decision_ID, Employee_ID } = req.body;
        
        const sql = `INSERT INTO Reward_Discipline (Reward_Discipline_ID, In_Form, Issued_Date, Which_Type, Reason, Decision_ID, Employee_ID) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [Reward_Discipline_ID, In_Form, Issued_Date || null, Which_Type, Reason, Decision_ID || null, Employee_ID]);
        
        res.status(201).json({ message: 'Thêm hồ sơ Khen thưởng/Kỷ luật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { In_Form, Issued_Date, Which_Type, Reason, Decision_ID, Employee_ID } = req.body;
        
        const sql = `UPDATE Reward_Discipline SET In_Form=?, Issued_Date=?, Which_Type=?, Reason=?, Decision_ID=?, Employee_ID=? WHERE Reward_Discipline_ID=?`;
        await db.query(sql, [In_Form, Issued_Date || null, Which_Type, Reason, Decision_ID || null, Employee_ID, id]);
        
        res.json({ message: 'Cập nhật thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Reward_Discipline WHERE Reward_Discipline_ID=?', [id]);
        res.json({ message: 'Xóa thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};