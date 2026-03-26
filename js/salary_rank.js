const API_URL = 'http://localhost:3000/api/salary-ranks';
let globalSalaryRanks = [];

// 1. TẢI DANH SÁCH
async function loadSalaryRanks() {
    try {
        const response = await fetch(API_URL);
        globalSalaryRanks = await response.json();

        const tableBody = document.getElementById('salaryRankList');
        tableBody.innerHTML = ''; 

        globalSalaryRanks.forEach(rank => {
            const row = `
                <tr>
                    <td><strong>${rank.Salary_Rank_ID}</strong></td>
                    <td><span class="badge bg-secondary">${rank.Rank_Code || '-'}</span></td>
                    <td>${rank.Rank_Name || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${rank.Salary_Rank_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteSalaryRank('${rank.Salary_Rank_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('salaryRankList').innerHTML = '<tr><td colspan="4" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addSalaryRank() {
    const newData = {
        Salary_Rank_ID: document.getElementById('add_id').value,
        Rank_Code: document.getElementById('add_code').value,
        Rank_Name: document.getElementById('add_name').value
    };

    if (!newData.Salary_Rank_ID || !newData.Rank_Name) {
        alert("ID và Tên không được để trống!");
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
            loadSalaryRanks(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteSalaryRank(id) {
    if (confirm(`Xóa Ngạch/Bậc lương ${id}?\nChú ý: Không thể xóa nếu đang được sử dụng ở bảng khác.`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadSalaryRanks(); 
            } else {
                alert('Lỗi: Đang có dữ liệu liên kết (Dính khóa ngoại)!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const rank = globalSalaryRanks.find(r => r.Salary_Rank_ID === id);
    if (!rank) return;

    document.getElementById('edit_id').value = rank.Salary_Rank_ID;
    document.getElementById('edit_code').value = rank.Rank_Code || '';
    document.getElementById('edit_name').value = rank.Rank_Name || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateSalaryRank() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Rank_Code: document.getElementById('edit_code').value,
        Rank_Name: document.getElementById('edit_name').value
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
            loadSalaryRanks(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadSalaryRanks);