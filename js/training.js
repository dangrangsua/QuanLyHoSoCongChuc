const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalTrainings = [];

// 1. TẢI DANH SÁCH
async function loadTrainings() {
    try {
        const response = await fetch(API_URL);
        globalTrainings = await response.json();

        const tableBody = document.getElementById('trainingList');
        tableBody.innerHTML = ''; 

        globalTrainings.forEach(t => {
            const startDate = t.Start_Date ? new Date(t.Start_Date).toLocaleDateString('vi-VN') : '-';
            const endDate = t.End_Date ? new Date(t.End_Date).toLocaleDateString('vi-VN') : '-';

            const row = `
                <tr>
                    <td><strong class="text-info">${t.T_Qualification_ID}</strong></td>
                    <td><span class="fw-bold">${t.Trainning_Name || '-'}</span></td>
                    <td>${t.Location || '-'}</td>
                    <td>${startDate}</td>
                    <td><strong class="text-danger">${endDate}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${t.T_Qualification_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTraining('${t.T_Qualification_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('trainingList').innerHTML = '<tr><td colspan="6" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addTraining() {
    const newData = {
        T_Qualification_ID: document.getElementById('add_id').value,
        Trainning_Name: document.getElementById('add_name').value, // Code khớp y chang lỗi chính tả trong DB nha
        Location: document.getElementById('add_location').value,
        Start_Date: document.getElementById('add_start').value || null,
        End_Date: document.getElementById('add_end').value || null
    };

    if (!newData.T_Qualification_ID) {
        alert("Mã Khóa đào tạo không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm khóa đào tạo thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadTrainings(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(LƯU Ý: Mã này PHẢI được tạo bên bảng "Bằng Cấp (Chung)" trước rồi mới thêm chi tiết vào đây nha!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteTraining(id) {
    if (confirm(`Xóa khóa đào tạo ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadTrainings(); 
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
    const t = globalTrainings.find(x => x.T_Qualification_ID === id);
    if (!t) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = t.T_Qualification_ID;
    document.getElementById('edit_name').value = t.Trainning_Name || '';
    document.getElementById('edit_location').value = t.Location || '';
    document.getElementById('edit_start').value = formatDt(t.Start_Date);
    document.getElementById('edit_end').value = formatDt(t.End_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateTraining() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Trainning_Name: document.getElementById('edit_name').value,
        Location: document.getElementById('edit_location').value,
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
            loadTrainings(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadTrainings);