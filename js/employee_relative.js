const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalERs = [];

// 1. TẢI DANH SÁCH
async function loadERs() {
    try {
        const response = await fetch(API_URL);
        globalERs = await response.json();

        const tableBody = document.getElementById('erList');
        tableBody.innerHTML = ''; 

        globalERs.forEach(er => {
            const row = `
                <tr>
                    <td><span class="badge bg-primary fs-6">${er.Employee_ID}</span></td>
                    <td><span class="badge bg-dark fs-6">${er.Relative_ID}</span></td>
                    <td><strong class="text-success">${er.Relationship || '-'}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${er.Employee_ID}', '${er.Relative_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteER('${er.Employee_ID}', '${er.Relative_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('erList').innerHTML = '<tr><td colspan="4" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addER() {
    const newData = {
        Employee_ID: document.getElementById('add_emp_id').value,
        Relative_ID: document.getElementById('add_rel_id').value,
        Relationship: document.getElementById('add_relation').value
    };

    if (!newData.Employee_ID || !newData.Relative_ID) {
        alert("Mã Nhân viên và Mã Thân nhân không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm mối quan hệ thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadERs(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Kiểm tra xem Mã Nhân Viên và Mã Thân Nhân đã tồn tại ở 2 bảng kia chưa nha!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA (Cần cả 2 ID)
async function deleteER(empId, relId) {
    if (confirm(`Xóa mối quan hệ giữa Nhân viên ${empId} và Thân nhân ${relId}?`)) {
        try {
            const response = await fetch(`${API_URL}/${empId}/${relId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadERs(); 
            } else {
                alert('Lỗi xóa dữ liệu!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(empId, relId) {
    // Tìm dòng dữ liệu khớp cả 2 ID
    const er = globalERs.find(x => x.Employee_ID === empId && x.Relative_ID === relId);
    if (!er) return;

    document.getElementById('edit_emp_id').value = er.Employee_ID;
    document.getElementById('edit_rel_id').value = er.Relative_ID;
    document.getElementById('edit_relation').value = er.Relationship || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateER() {
    const empId = document.getElementById('edit_emp_id').value; 
    const relId = document.getElementById('edit_rel_id').value; 
    
    const updatedData = {
        Relationship: document.getElementById('edit_relation').value
    };

    try {
        const response = await fetch(`${API_URL}/${empId}/${relId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert('Cập nhật thành công!');
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            loadERs(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadERs);