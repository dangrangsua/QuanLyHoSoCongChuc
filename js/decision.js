const API_URL = 'http://localhost:3000/api/decisions';
let globalDecisions = [];

// 1. TẢI DANH SÁCH
async function loadDecisions() {
    try {
        const response = await fetch(API_URL);
        globalDecisions = await response.json();

        const tableBody = document.getElementById('decisionList');
        tableBody.innerHTML = ''; 

        globalDecisions.forEach(dec => {
            const signDate = dec.Sign_Date ? new Date(dec.Sign_Date).toLocaleDateString('vi-VN') : '';
            const effDate = dec.Effective_Date ? new Date(dec.Effective_Date).toLocaleDateString('vi-VN') : '';
            
            let badgeColor = 'bg-secondary';
            if (dec.Decision_Type === 'Khen thưởng') badgeColor = 'bg-success';
            if (dec.Decision_Type === 'Kỷ luật') badgeColor = 'bg-danger';
            if (dec.Decision_Type === 'Bổ nhiệm') badgeColor = 'bg-primary';

            const row = `
                <tr>
                    <td><strong>${dec.Decision_ID}</strong></td>
                    <td>${dec.Decision_Number || '-'}</td>
                    <td><span class="badge ${badgeColor}">${dec.Decision_Type || ''}</span></td>
                    <td>${signDate}</td>
                    <td>${effDate}</td>
                    <td>${dec.Signer || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${dec.Decision_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDecision('${dec.Decision_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('decisionList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addDecision() {
    const newData = {
        Decision_ID: document.getElementById('add_id').value,
        Decision_Number: document.getElementById('add_number').value,
        Decision_Type: document.getElementById('add_type').value,
        Signer: document.getElementById('add_signer').value,
        Sign_Date: document.getElementById('add_sign_date').value || null,
        Effective_Date: document.getElementById('add_effective_date').value || null
    };

    if (!newData.Decision_ID) {
        alert("Mã quyết định không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            alert('Thêm quyết định thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadDecisions(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteDecision(id) {
    if (confirm(`Xóa Quyết định ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadDecisions(); 
            } else {
                alert('Lỗi: Quyết định đang được sử dụng!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const dec = globalDecisions.find(d => d.Decision_ID === id);
    if (!dec) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = dec.Decision_ID;
    document.getElementById('edit_number').value = dec.Decision_Number || '';
    document.getElementById('edit_type').value = dec.Decision_Type || 'Tuyển dụng';
    document.getElementById('edit_signer').value = dec.Signer || '';
    document.getElementById('edit_sign_date').value = formatDt(dec.Sign_Date);
    document.getElementById('edit_effective_date').value = formatDt(dec.Effective_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateDecision() {
    const id = document.getElementById('edit_id').value; 
    
    const updatedData = {
        Decision_Number: document.getElementById('edit_number').value,
        Decision_Type: document.getElementById('edit_type').value,
        Signer: document.getElementById('edit_signer').value,
        Sign_Date: document.getElementById('edit_sign_date').value || null,
        Effective_Date: document.getElementById('edit_effective_date').value || null
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
            loadDecisions(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadDecisions);