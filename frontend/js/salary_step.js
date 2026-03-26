const API_URL = 'http://localhost:3000/api/salary-steps';
let globalSalarySteps = [];

// 1. TẢI DANH SÁCH
async function loadSalarySteps() {
    try {
        const response = await fetch(API_URL);
        globalSalarySteps = await response.json();

        const tableBody = document.getElementById('salaryStepList');
        tableBody.innerHTML = ''; 

        globalSalarySteps.forEach(step => {
            const row = `
                <tr>
                    <td><strong>${step.Step_ID}</strong></td>
                    <td><span class="badge bg-info text-dark">${step.Salary_Rank_ID || '-'}</span></td>
                    <td><strong class="text-danger">${step.Coefficient || '0.00'}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${step.Step_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteSalaryStep('${step.Step_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('salaryStepList').innerHTML = '<tr><td colspan="4" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addSalaryStep() {
    const newData = {
        Step_ID: document.getElementById('add_id').value,
        Salary_Rank_ID: document.getElementById('add_rank_id').value,
        Coefficient: document.getElementById('add_coef').value
    };

    if (!newData.Step_ID || !newData.Salary_Rank_ID) {
        alert("Mã Bậc lương và Mã Ngạch lương không được để trống!");
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
            loadSalarySteps(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Khả năng cao Mã Ngạch Lương chưa tồn tại trong bảng Salary_Rank)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteSalaryStep(id) {
    if (confirm(`Xóa Bậc Lương ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadSalarySteps(); 
            } else {
                alert('Lỗi: Không thể xóa do dính khóa ngoại ở bảng khác!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const step = globalSalarySteps.find(s => s.Step_ID === id);
    if (!step) return;

    document.getElementById('edit_id').value = step.Step_ID;
    document.getElementById('edit_rank_id').value = step.Salary_Rank_ID || '';
    document.getElementById('edit_coef').value = step.Coefficient || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateSalaryStep() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Salary_Rank_ID: document.getElementById('edit_rank_id').value,
        Coefficient: document.getElementById('edit_coef').value
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
            loadSalarySteps(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadSalarySteps);