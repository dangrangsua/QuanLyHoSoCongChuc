const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalWorkHistories = []; 

// 1. READ
async function loadWorkHistories() {
    try {
        const response = await fetch(API_URL);
        globalWorkHistories = await response.json(); 

        const tableBody = document.getElementById('workHistoryList');
        tableBody.innerHTML = ''; 

        globalWorkHistories.forEach(wh => {
            const start = wh.Start_Date ? new Date(wh.Start_Date).toLocaleDateString('vi-VN') : '';
            const end = wh.End_Date ? new Date(wh.End_Date).toLocaleDateString('vi-VN') : 'Hiện tại';
            
            const row = `
                <tr>
                    <td><strong>${wh.WorkHistory_ID}</strong></td>
                    <td><span class="badge bg-primary">${wh.Employee_ID}</span></td>
                    <td>${start}</td>
                    <td>${end}</td>
                    <td>${wh.Department_ID || '-'}</td>
                    <td>${wh.Decision_ID || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${wh.WorkHistory_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteWorkHistory('${wh.WorkHistory_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('workHistoryList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. CREATE
async function addWorkHistory() {
    const newData = {
        WorkHistory_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        Start_Date: document.getElementById('add_start').value || null,
        End_Date: document.getElementById('add_end').value || null,
        Department_ID: document.getElementById('add_dept_id').value || null,
        Decision_ID: document.getElementById('add_dec_id').value || null,
        Position_ID: document.getElementById('add_pos_id').value || null
    };

    if (!newData.WorkHistory_ID || !newData.Employee_ID) {
        alert("Mã Quá trình và Mã Nhân viên không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadWorkHistories(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. DELETE
async function deleteWorkHistory(id) {
    if (confirm(`Xóa Quá trình công tác ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadWorkHistories(); 
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const wh = globalWorkHistories.find(w => w.WorkHistory_ID === id);
    if (!wh) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = wh.WorkHistory_ID;
    document.getElementById('edit_emp_id').value = wh.Employee_ID;
    document.getElementById('edit_start').value = formatDt(wh.Start_Date);
    document.getElementById('edit_end').value = formatDt(wh.End_Date);
    document.getElementById('edit_dept_id').value = wh.Department_ID || '';
    document.getElementById('edit_dec_id').value = wh.Decision_ID || '';
    document.getElementById('edit_pos_id').value = wh.Position_ID || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. UPDATE
async function updateWorkHistory() {
    const id = document.getElementById('edit_id').value; 
    
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        Start_Date: document.getElementById('edit_start').value || null,
        End_Date: document.getElementById('edit_end').value || null,
        Department_ID: document.getElementById('edit_dept_id').value || null,
        Decision_ID: document.getElementById('edit_dec_id').value || null,
        Position_ID: document.getElementById('edit_pos_id').value || null
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
            loadWorkHistories(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadWorkHistories);