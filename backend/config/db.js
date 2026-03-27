const mysql = require('mysql2');

// Tạo Pool kết nối
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', // <-- VÍ DỤ: '123456' HOẶC ĐỂ TRỐNG ''
    database: 'quanlynhansu', //dien ten Dâtbase
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// DÒNG QUAN TRỌNG NHẤT: Chuyển sang Promise để dùng được await/async
const db = pool.promise();

// Kiểm tra kết nối khi khởi động
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Lỗi kết nối MySQL:', err.message);
    } else {
        console.log('✅ Đã kết nối thành công tới Database: quanlynhansu');
        connection.release();
    }
});

module.exports = db;