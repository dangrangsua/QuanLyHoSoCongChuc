const API_URL = 'http://localhost:3000/api/reward-discipline';
let globalRDs = [];

// 1. TẢI DANH SÁCH
async function loadRDs() {
    try {
        const response = await fetch(API_URL);
        globalRDs = await response.json();

        const tableBody = document.getElementById('rdList');
        tableBody.innerHTML = ''; 

        globalRDs.forEach(rd => {
            const dateFmt = rd.Issued_Date ? new Date(rd.Issued_Date).toLocaleDateString('vi-VN') : '-';
            
            // Tô màu: Khen thưởng thì xanh, Kỷ luật thì đỏ
            let typeBadge = 'bg-secondary';
            if (rd.Which_Type === 'Khen thưởng') typeBadge = 'bg-success';
            if (rd.Which_Type === 'Kỷ luật') typeBadge = 'bg-danger';

            const row = `
                <tr>
                    <td><strong>${rd.Reward_Discipline_ID}</strong></td>
                    <td><span class="badge bg-primary">${rd.Employee_ID || '-'}</span></td>
                    <td><span class="badge ${typeBadge}">${rd.Which_Type || '-'}</span></td>
                    <td>${rd.In_Form || '-'}</td>
                    <td>${dateFmt}</td>
                    <td>${rd.Decision_ID || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${rd.Reward_Discipline_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteRD('${rd.Reward_Discipline_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('rdList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addRD() {
    const newData = {
        Reward_Discipline_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        Which_Type: document.getElementById('add_type').value,
        In_Form: document.getElementById('add_form').value,
        Issued_Date: document.getElementById('add_date').value || null,
        Decision_ID: document.getElementById('add_dec_id').value || null,
        Reason: document.getElementById('add_reason').value
    };

    if (!newData.Reward_Discipline_ID || !newData.Employee_ID) {
        alert("Mã Hồ sơ và Mã Nhân viên không được để trống!");
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
            loadRDs(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Kiểm tra lại xem Mã Nhân Viên hoặc Quyết Định đã tồn tại chưa nha!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteRD(id) {
    if (confirm(`Xóa hồ sơ Khen thưởng/Kỷ luật ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadRDs(); 
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
    const rd = globalRDs.find(r => r.Reward_Discipline_ID === id);
    if (!rd) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = rd.Reward_Discipline_ID;
    document.getElementById('edit_emp_id').value = rd.Employee_ID || '';
    document.getElementById('edit_type').value = rd.Which_Type || 'Khen thưởng';
    document.getElementById('edit_form').value = rd.In_Form || '';
    document.getElementById('edit_date').value = formatDt(rd.Issued_Date);
    document.getElementById('edit_dec_id').value = rd.Decision_ID || '';
    document.getElementById('edit_reason').value = rd.Reason || '';

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateRD() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        Which_Type: document.getElementById('edit_type').value,
        In_Form: document.getElementById('edit_form').value,
        Issued_Date: document.getElementById('edit_date').value || null,
        Decision_ID: document.getElementById('edit_dec_id').value || null,
        Reason: document.getElementById('edit_reason').value
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
            loadRDs(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadRDs);