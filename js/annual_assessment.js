const API_URL = 'http://localhost:3000/api/annual-assessment';
let globalAssessments = [];

// 1. TẢI DANH SÁCH
async function loadAssessments() {
    try {
        const response = await fetch(API_URL);
        globalAssessments = await response.json();

        const tableBody = document.getElementById('assessmentList');
        tableBody.innerHTML = ''; 

        globalAssessments.forEach(ass => {
            const dateFmt = ass.Issued_Date ? new Date(ass.Issued_Date).toLocaleDateString('vi-VN') : '-';
            
            // Trang trí màu sắc cho Xếp loại
            let ratingBadge = 'bg-secondary';
            if (ass.Rating === 'Xuất sắc') ratingBadge = 'bg-success';
            if (ass.Rating === 'Tốt') ratingBadge = 'bg-primary';
            if (ass.Rating === 'Khá') ratingBadge = 'bg-info text-dark';
            if (ass.Rating === 'Yếu') ratingBadge = 'bg-danger';

            const row = `
                <tr>
                    <td><strong>${ass.Assessment_ID}</strong></td>
                    <td><span class="badge bg-dark">${ass.Employee_ID || '-'}</span></td>
                    <td>${ass.On_Period || '-'}</td>
                    <td><span class="badge ${ratingBadge}">${ass.Rating || '-'}</span></td>
                    <td>${dateFmt}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${ass.Assessment_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAssessment('${ass.Assessment_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('assessmentList').innerHTML = '<tr><td colspan="6" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addAssessment() {
    const newData = {
        Assessment_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        On_Period: document.getElementById('add_period').value,
        Rating: document.getElementById('add_rating').value,
        Issued_Date: document.getElementById('add_date').value || null
    };

    if (!newData.Assessment_ID || !newData.Employee_ID) {
        alert("Mã Đánh giá và Mã Nhân viên không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm phiếu đánh giá thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadAssessments(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Khả năng cao Mã Nhân viên chưa tồn tại!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteAssessment(id) {
    if (confirm(`Xóa phiếu đánh giá ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadAssessments(); 
            } else {
                alert('Lỗi xóa dữ liệu!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const ass = globalAssessments.find(a => a.Assessment_ID === id);
    if (!ass) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = ass.Assessment_ID;
    document.getElementById('edit_emp_id').value = ass.Employee_ID || '';
    document.getElementById('edit_period').value = ass.On_Period || '';
    document.getElementById('edit_rating').value = ass.Rating || 'Tốt';
    document.getElementById('edit_date').value = formatDt(ass.Issued_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateAssessment() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        On_Period: document.getElementById('edit_period').value,
        Rating: document.getElementById('edit_rating').value,
        Issued_Date: document.getElementById('edit_date').value || null
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert('Cập nhật thành công!');
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            loadAssessments(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadAssessments);