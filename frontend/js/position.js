const API_URL = 'http://localhost:3000/api/positions';
let globalPositions = [];

// 1. TẢI DANH SÁCH
async function loadPositions() {
    try {
        const response = await fetch(API_URL);
        globalPositions = await response.json();

        const tableBody = document.getElementById('positionList');
        tableBody.innerHTML = ''; 

        globalPositions.forEach(pos => {
            let levelBadge = 'bg-info text-dark';
            if(pos.Position_Level && pos.Position_Level.toLowerCase().includes('quản lý')) levelBadge = 'bg-danger';

            const row = `
                <tr>
                    <td><strong>${pos.Position_ID}</strong></td>
                    <td><span class="badge ${levelBadge}">${pos.Position_Level || '-'}</span></td>
                    <td>${pos.Position_Name || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${pos.Position_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deletePosition('${pos.Position_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('positionList').innerHTML = '<tr><td colspan="4" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addPosition() {
    const newData = {
        Position_ID: document.getElementById('add_id').value,
        Position_Level: document.getElementById('add_level').value,
        Position_Name: document.getElementById('add_name').value
    };

    if (!newData.Position_ID || !newData.Position_Name) {
        alert("Mã và Tên chức vụ không được để trống!");
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
            loadPositions(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deletePosition(id) {
    if (confirm(`Xóa Chức vụ ${id}?\nChú ý: Sẽ không thể xóa nếu có nhân viên đang giữ chức vụ này.`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadPositions(); 
            } else {
                alert('Lỗi: Chức vụ này đang được gán cho nhân viên (Dính khóa ngoại)!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const pos = globalPositions.find(p => p.Position_ID === id);
    if (!pos) return;

    document.getElementById('edit_id').value = pos.Position_ID;
    document.getElementById('edit_level').value = pos.Position_Level || '';
    document.getElementById('edit_name').value = pos.Position_Name || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updatePosition() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Position_Level: document.getElementById('edit_level').value,
        Position_Name: document.getElementById('edit_name').value
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
            loadPositions(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadPositions);