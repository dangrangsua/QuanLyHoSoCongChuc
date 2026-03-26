const API_URL = 'http://localhost:3000/api/salary-history';
let globalSalaryHistories = [];

// 1. TẢI DANH SÁCH
async function loadSalaryHistories() {
    try {
        const response = await fetch(API_URL);
        globalSalaryHistories = await response.json();

        const tableBody = document.getElementById('salaryHistoryList');
        tableBody.innerHTML = ''; 

        globalSalaryHistories.forEach(hist => {
            const startDate = hist.Start_Date ? new Date(hist.Start_Date).toLocaleDateString('vi-VN') : '';
            const endDate = hist.End_Date ? new Date(hist.End_Date).toLocaleDateString('vi-VN') : 'Hiện tại';

            const row = `
                <tr>
                    <td><strong>${hist.Salary_History_ID}</strong></td>
                    <td><span class="badge bg-primary">${hist.Employee_ID || '-'}</span></td>
                    <td><span class="badge bg-info text-dark">${hist.Step_ID || '-'}</span></td>
                    <td><span class="badge bg-secondary">${hist.Decision_ID || '-'}</span></td>
                    <td>${startDate}</td>
                    <td>${endDate}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${hist.Salary_History_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteSalaryHistory('${hist.Salary_History_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('salaryHistoryList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addSalaryHistory() {
    const newData = {
        Salary_History_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        Step_ID: document.getElementById('add_step_id').value,
        Decision_ID: document.getElementById('add_dec_id').value,
        Start_Date: document.getElementById('add_start').value || null,
        End_Date: document.getElementById('add_end').value || null
    };

    if (!newData.Salary_History_ID || !newData.Employee_ID || !newData.Step_ID || !newData.Decision_ID) {
        alert("Vui lòng nhập đầy đủ các Mã (ID) bắt buộc!");
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
            loadSalaryHistories(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Khả năng cao Mã Nhân viên, Bậc Lương hoặc Quyết định chưa tồn tại!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteSalaryHistory(id) {
    if (confirm(`Xóa Lịch sử lương ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadSalaryHistories(); 
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
    const hist = globalSalaryHistories.find(h => h.Salary_History_ID === id);
    if (!hist) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = hist.Salary_History_ID;
    document.getElementById('edit_emp_id').value = hist.Employee_ID || '';
    document.getElementById('edit_step_id').value = hist.Step_ID || '';
    document.getElementById('edit_dec_id').value = hist.Decision_ID || '';
    document.getElementById('edit_start').value = formatDt(hist.Start_Date);
    document.getElementById('edit_end').value = formatDt(hist.End_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateSalaryHistory() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        Step_ID: document.getElementById('edit_step_id').value,
        Decision_ID: document.getElementById('edit_dec_id').value,
        Start_Date: document.getElementById('edit_start').value || null,
        End_Date: document.getElementById('edit_end').value || null
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
            loadSalaryHistories(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadSalaryHistories);