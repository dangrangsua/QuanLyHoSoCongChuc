const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalDepartments = [];

// 1. TẢI DANH SÁCH
async function loadDepartments() {
    try {
        const response = await fetch(API_URL);
        globalDepartments = await response.json();

        const tableBody = document.getElementById('departmentList');
        tableBody.innerHTML = ''; 

        globalDepartments.forEach(dep => {
            const row = `
                <tr>
                    <td><strong>${dep.Department_ID}</strong></td>
                    <td>${dep.Dept_Name || ''}</td>
                    <td>${dep.Email || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${dep.Department_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDepartment('${dep.Department_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('departmentList').innerHTML = '<tr><td colspan="4" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addDepartment() {
    const newData = {
        Department_ID: document.getElementById('add_id').value,
        Dept_Name: document.getElementById('add_name').value,
        Email: document.getElementById('add_email').value
    };

    if (!newData.Department_ID || !newData.Dept_Name) {
        alert("Mã phòng và Tên phòng không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm phòng ban thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadDepartments(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteDepartment(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa phòng ban ${id}?\nLưu ý: Không thể xóa nếu phòng ban đang có nhân viên!`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadDepartments(); 
            } else {
                alert('Lỗi: Không thể xóa do đang có dữ liệu liên kết.');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const dep = globalDepartments.find(d => d.Department_ID === id);
    if (!dep) return;

    document.getElementById('edit_id').value = dep.Department_ID;
    document.getElementById('edit_name').value = dep.Dept_Name || '';
    document.getElementById('edit_email').value = dep.Email || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateDepartment() {
    const id = document.getElementById('edit_id').value; 
    
    const updatedData = {
        Dept_Name: document.getElementById('edit_name').value,
        Email: document.getElementById('edit_email').value
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
            loadDepartments(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadDepartments);