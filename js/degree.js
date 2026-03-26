const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalDegrees = [];

// 1. TẢI DANH SÁCH
async function loadDegrees() {
    try {
        const response = await fetch(API_URL);
        globalDegrees = await response.json();

        const tableBody = document.getElementById('degreeList');
        tableBody.innerHTML = ''; 

        globalDegrees.forEach(deg => {
            // Tô màu Xếp loại cho đẹp
            let gradeBadge = 'bg-secondary';
            if (deg.Grade === 'Xuất sắc') gradeBadge = 'bg-danger';
            if (deg.Grade === 'Giỏi') gradeBadge = 'bg-success';
            if (deg.Grade === 'Khá') gradeBadge = 'bg-primary';

            const row = `
                <tr>
                    <td><strong class="text-info">${deg.D_Qualification_ID}</strong></td>
                    <td><span class="fw-bold">${deg.Degree_Name || '-'}</span></td>
                    <td>${deg.Major || '-'}</td>
                    <td><span class="badge ${gradeBadge}">${deg.Grade || '-'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${deg.D_Qualification_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDegree('${deg.D_Qualification_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('degreeList').innerHTML = '<tr><td colspan="5" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addDegree() {
    const newData = {
        D_Qualification_ID: document.getElementById('add_id').value,
        Degree_Name: document.getElementById('add_name').value,
        Major: document.getElementById('add_major').value,
        Grade: document.getElementById('add_grade').value
    };

    if (!newData.D_Qualification_ID) {
        alert("Mã Bằng cấp không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm chi tiết bằng cấp thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadDegrees(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(LƯU Ý: Mã Bằng này PHẢI được tạo bên bảng "Bằng Cấp (Chung)" trước rồi mới thêm chi tiết vào đây được nha!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteDegree(id) {
    if (confirm(`Xóa chi tiết bằng cấp ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadDegrees(); 
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
    const deg = globalDegrees.find(d => d.D_Qualification_ID === id);
    if (!deg) return;

    document.getElementById('edit_id').value = deg.D_Qualification_ID;
    document.getElementById('edit_name').value = deg.Degree_Name || '';
    document.getElementById('edit_major').value = deg.Major || '';
    document.getElementById('edit_grade').value = deg.Grade || 'Khá';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateDegree() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Degree_Name: document.getElementById('edit_name').value,
        Major: document.getElementById('add_major').value,
        Grade: document.getElementById('edit_grade').value
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
            loadDegrees(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadDegrees);