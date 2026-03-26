const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalRelatives = [];

// 1. TẢI DANH SÁCH
async function loadRelatives() {
    try {
        const response = await fetch(API_URL);
        globalRelatives = await response.json();

        const tableBody = document.getElementById('relativeList');
        tableBody.innerHTML = ''; 

        globalRelatives.forEach(rel => {
            const dob = rel.DOB ? new Date(rel.DOB).toLocaleDateString('vi-VN') : '-';
            const fullName = `${rel.First_Name} ${rel.Middle_Name || ''} ${rel.Last_Name}`.replace(/\s+/g, ' ').trim();

            const row = `
                <tr>
                    <td><strong>${rel.Relative_ID}</strong></td>
                    <td><span class="text-primary fw-bold">${fullName}</span></td>
                    <td>${dob}</td>
                    <td>${rel.ID_Card || '-'}</td>
                    <td>${rel.Occupation || '-'}</td>
                    <td>${rel.Current_Address || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${rel.Relative_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteRelative('${rel.Relative_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('relativeList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addRelative() {
    const newData = {
        Relative_ID: document.getElementById('add_id').value,
        First_Name: document.getElementById('add_first').value,
        Middle_Name: document.getElementById('add_middle').value,
        Last_Name: document.getElementById('add_last').value,
        DOB: document.getElementById('add_dob').value || null,
        ID_Card: document.getElementById('add_idcard').value,
        Occupation: document.getElementById('add_job').value,
        Current_Address: document.getElementById('add_address').value
    };

    if (!newData.Relative_ID || !newData.First_Name || !newData.Last_Name) {
        alert("Mã Thân nhân, Họ và Tên không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm thân nhân thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadRelatives(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Lưu ý: Nếu nhập CCCD thì số CCCD này không được trùng với người khác!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteRelative(id) {
    if (confirm(`Xóa thân nhân ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadRelatives(); 
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
    const rel = globalRelatives.find(r => r.Relative_ID === id);
    if (!rel) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = rel.Relative_ID;
    document.getElementById('edit_first').value = rel.First_Name || '';
    document.getElementById('edit_middle').value = rel.Middle_Name || '';
    document.getElementById('edit_last').value = rel.Last_Name || '';
    document.getElementById('edit_dob').value = formatDt(rel.DOB);
    document.getElementById('edit_idcard').value = rel.ID_Card || '';
    document.getElementById('edit_job').value = rel.Occupation || '';
    document.getElementById('edit_address').value = rel.Current_Address || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateRelative() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        First_Name: document.getElementById('edit_first').value,
        Middle_Name: document.getElementById('edit_middle').value,
        Last_Name: document.getElementById('edit_last').value,
        DOB: document.getElementById('edit_dob').value || null,
        ID_Card: document.getElementById('edit_idcard').value,
        Occupation: document.getElementById('edit_job').value,
        Current_Address: document.getElementById('edit_address').value
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
            loadRelatives(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadRelatives);