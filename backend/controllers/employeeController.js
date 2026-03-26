const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Employee ORDER BY Employee_ID DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { 
            Employee_ID, First_Name, Middle_Name, Last_Name, DOB, Gender, 
            Ethnicity, Political_Theory, Work_Status, Religion, ID_Card, 
            Hometown, Current_Address, Party_Join_Date, Phone, Email 
        } = req.body;

        const sql = `INSERT INTO Employee 
            (Employee_ID, First_Name, Middle_Name, Last_Name, DOB, Gender, Ethnicity, Political_Theory, Work_Status, Religion, ID_Card, Hometown, Current_Address, Party_Join_Date, Phone, Email) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
                     
        await db.query(sql, [
            Employee_ID, First_Name, Middle_Name, Last_Name, DOB || null, Gender, 
            Ethnicity, Political_Theory, Work_Status, Religion, ID_Card, 
            Hometown, Current_Address, Party_Join_Date || null, Phone, Email
        ]);
        
        res.status(201).json({ message: 'Thêm hồ sơ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            First_Name, Middle_Name, Last_Name, DOB, Gender, Ethnicity, 
            Political_Theory, Work_Status, Religion, ID_Card, Hometown, 
            Current_Address, Party_Join_Date, Phone, Email 
        } = req.body;

        const sql = `UPDATE Employee SET 
            First_Name=?, Middle_Name=?, Last_Name=?, DOB=?, Gender=?, Ethnicity=?, 
            Political_Theory=?, Work_Status=?, Religion=?, ID_Card=?, Hometown=?, 
            Current_Address=?, Party_Join_Date=?, Phone=?, Email=? 
            WHERE Employee_ID=?`;
                     
        await db.query(sql, [
            First_Name, Middle_Name, Last_Name, DOB || null, Gender, Ethnicity, 
            Political_Theory, Work_Status, Religion, ID_Card, Hometown, 
            Current_Address, Party_Join_Date || null, Phone, Email, id
        ]);
        
        res.json({ message: 'Cập nhật hồ sơ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Employee WHERE Employee_ID=?', [id]);
        res.json({ message: 'Xóa hồ sơ thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

        // Tim Kiem

// Thêm hàm này vào cuối file employeeController.js
exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Thông tin cơ bản
        const [emp] = await db.query('SELECT * FROM Employee WHERE Employee_ID = ?', [id]);
        if (emp.length === 0) return res.status(404).json({ error: 'Không tìm thấy Nhân viên này!' });

        // 2. Quá trình công tác (Lấy thêm tên Phòng, tên Chức vụ)
        const [workHistory] = await db.query(`
            SELECT w.*, d.Dept_Name, p.Position_Name 
            FROM WorkHistory w 
            LEFT JOIN Department d ON w.Department_ID = d.Department_ID
            LEFT JOIN \`Position\` p ON w.Position_ID = p.Position_ID
            WHERE w.Employee_ID = ? ORDER BY w.Start_Date DESC
        `, [id]);

        // 3. Lịch sử Lương (Lấy thêm Hệ số và Tên Ngạch)
        const [salaryHistory] = await db.query(`
            SELECT sh.*, ss.Coefficient, sr.Rank_Name
            FROM Salary_History sh
            LEFT JOIN Salary_Step ss ON sh.Step_ID = ss.Step_ID
            LEFT JOIN Salary_Rank sr ON ss.Salary_Rank_ID = sr.Salary_Rank_ID
            WHERE sh.Employee_ID = ? ORDER BY sh.Start_Date DESC
        `, [id]);

        // 4. Bằng cấp & Chứng chỉ
        const [qualis] = await db.query('SELECT * FROM Qualification WHERE Employee_ID = ?', [id]);
        
        // 5. Chi tiết Bằng Đại học
        const [degrees] = await db.query(`
            SELECT d.*, q.Issued_By, q.Issued_Date 
            FROM Degree d JOIN Qualification q ON d.D_Qualification_ID = q.Qualification_ID 
            WHERE q.Employee_ID = ?
        `, [id]);

        // 6. Khóa đào tạo
        const [trainings] = await db.query(`
            SELECT t.*, q.Issued_By 
            FROM Training t JOIN Qualification q ON t.T_Qualification_ID = q.Qualification_ID 
            WHERE q.Employee_ID = ?
        `, [id]);

        // 7. Bảo hiểm
        const [insurance] = await db.query('SELECT * FROM Insurance WHERE Employee_ID = ?', [id]);

        // 8. Khen thưởng / Kỷ luật
        const [rewards] = await db.query('SELECT * FROM Reward_Discipline WHERE Employee_ID = ? ORDER BY Issued_Date DESC', [id]);

        // 9. Đánh giá hàng năm
        const [assessments] = await db.query('SELECT * FROM Annual_Assessment WHERE Employee_ID = ? ORDER BY Issued_Date DESC', [id]);

        // 10. Thân nhân (Nối bảng trung gian với bảng Thân nhân)
        const [relatives] = await db.query(`
            SELECT er.Relationship, r.* FROM Employee_Relative er
            JOIN Relative r ON er.Relative_ID = r.Relative_ID
            WHERE er.Employee_ID = ?
        `, [id]);

        // Trả về tất cả trong 1 cục data
        res.json({
            info: emp[0],
            workHistory,
            salaryHistory,
            qualifications: qualis,
            degrees,
            trainings,
            insurance,
            rewards,
            assessments,
            relatives
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};