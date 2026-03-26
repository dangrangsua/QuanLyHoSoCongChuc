const express = require('express');
const app = express();

// ÉP TRÌNH DUYỆT BỎ CHẶN (Bypass CORS & Blocked)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Cho phép Backend đọc dữ liệu JSON từ Frontend gửi lên
app.use(express.json());

// ================= IMPORT CÁC ROUTES =================
const employeeRoutes = require('./routes/employeeRoutes');
const workHistoryRoutes = require('./routes/workHistoryRoutes');
const departmentRoutes = require('./routes/departmentRoutes'); 
const decisionRoutes = require('./routes/decisionRoutes'); 
const positionRoutes = require('./routes/positionRoutes'); 
const salaryRankRoutes = require('./routes/salaryRankRoutes');
const salaryStepRoutes = require('./routes/salaryStepRoutes');
const salaryHistoryRoutes = require('./routes/salaryHistoryRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const rewardDisciplineRoutes = require('./routes/rewardDisciplineRoutes');
const annualAssessmentRoutes = require('./routes/annualAssessmentRoutes');
const qualificationRoutes = require('./routes/qualificationRoutes');
const degreeRoutes = require('./routes/degreeRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const relativeRoutes = require('./routes/relativeRoutes');
const employeeRelativeRoutes = require('./routes/employeeRelativeRoutes');



// ================= KẾT NỐI API ROUTES =================
app.get('/', (req, res) => res.send('🚀 Backend Hệ thống QLNS đang chạy ngon lành!'));

app.use('/api/employees', employeeRoutes);         // API Nhân viên
app.use('/api/work-history', workHistoryRoutes);   // API Quá trình công tác
app.use('/api/departments', departmentRoutes);     // API Phòng ban
app.use('/api/decisions', decisionRoutes);         // API Quyết định
app.use('/api/positions', positionRoutes);         // API Chức vụ
app.use('/api/salary-ranks', salaryRankRoutes);     //API
app.use('/api/salary-steps', salaryStepRoutes);
app.use('/api/salary-history', salaryHistoryRoutes);
app.use('/api/insurances', insuranceRoutes);
app.use('/api/reward-discipline', rewardDisciplineRoutes);
app.use('/api/annual-assessment', annualAssessmentRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/degrees', degreeRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/relatives', relativeRoutes);
app.use('/api/employee-relatives', employeeRelativeRoutes);



// ================= KHỞI ĐỘNG SERVER =================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 SERVER CHẠY TẠI: http://localhost:${PORT}`);
});