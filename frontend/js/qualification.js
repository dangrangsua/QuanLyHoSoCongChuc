const API_URL = 'http://localhost:3000/api/qualifications';
let globalQualis = [];

// 1. TẢI DANH SÁCH
async function loadQualis() {
    try {
        const response = await fetch(API_URL);
        globalQualis = await response.json();

        const tableBody = document.getElementById('qualiList');
        tableBody.innerHTML = ''; 

        globalQualis.forEach(q => {
            const dateFmt = q.Issued_Date ? new Date(q.Issued_Date).toLocaleDateString('vi-VN') : '-';
            
            const row = `
                <tr>
                    <td><strong>${q.Qualification_ID}</strong></td>
                    <td><span class="badge bg-primary">${q.Employee_ID || '-'}</span></td>
                    <td><span class="text-success fw-bold">${q.Quali_Type || '-'}</span></td>
                    <td>${q.Issued_By || '-'}</td>
                    <td>${dateFmt}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${q.Qualification_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteQuali('${q.Qualification_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('qualiList').innerHTML = '<tr><td colspan="6" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addQuali() {
    const newData = {
        Qualification_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        Quali_Type: document.getElementById('add_type').value,
        Issued_By: document.getElementById('add_issued_by').value,
        Issued_Date: document.getElementById('add_date').value || null
    };

    if (!newData.Qualification_ID || !newData.Employee_ID) {
        alert("Mã Bằng Cấp và Mã Nhân Viên không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm bằng cấp thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadQualis(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Khả năng cao Mã Nhân viên chưa tồn tại!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteQuali(id) {
    if (confirm(`Xóa bằng cấp/chứng chỉ ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadQualis(); 
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
    const q = globalQualis.find(i => i.Qualification_ID === id);
    if (!q) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = q.Qualification_ID;
    document.getElementById('edit_emp_id').value = q.Employee_ID || '';
    document.getElementById('edit_type').value = q.Quali_Type || '';
    document.getElementById('edit_issued_by').value = q.Issued_By || '';
    document.getElementById('edit_date').value = formatDt(q.Issued_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateQuali() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        Quali_Type: document.getElementById('edit_type').value,
        Issued_By: document.getElementById('edit_issued_by').value,
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
            loadQualis(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadQualis);