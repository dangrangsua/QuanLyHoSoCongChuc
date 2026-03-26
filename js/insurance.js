const API_URL = 'http://localhost:3000/api/insurances';
let globalInsurances = [];

// 1. TẢI DANH SÁCH
async function loadInsurances() {
    try {
        const response = await fetch(API_URL);
        globalInsurances = await response.json();

        const tableBody = document.getElementById('insuranceList');
        tableBody.innerHTML = ''; 

        globalInsurances.forEach(ins => {
            const issuedDate = ins.Issued_Date ? new Date(ins.Issued_Date).toLocaleDateString('vi-VN') : '-';
            const expDate = ins.Expiration_Date ? new Date(ins.Expiration_Date).toLocaleDateString('vi-VN') : '-';

            const row = `
                <tr>
                    <td><strong>${ins.Insurance_ID}</strong></td>
                    <td><span class="badge bg-primary">${ins.Employee_ID || '-'}</span></td>
                    <td>${ins.Health_CardID || '-'}</td>
                    <td>${issuedDate}</td>
                    <td><strong class="text-danger">${expDate}</strong></td>
                    <td>${ins.Issued_Place || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${ins.Insurance_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteInsurance('${ins.Insurance_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('insuranceList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addInsurance() {
    const newData = {
        Insurance_ID: document.getElementById('add_id').value,
        Employee_ID: document.getElementById('add_emp_id').value,
        Health_CardID: document.getElementById('add_card').value,
        Issued_Place: document.getElementById('add_place').value,
        Issued_Date: document.getElementById('add_issued').value || null,
        Expiration_Date: document.getElementById('add_exp').value || null
    };

    if (!newData.Insurance_ID || !newData.Employee_ID) {
        alert("Mã Bảo hiểm và Mã Nhân viên không được để trống!");
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
            loadInsurances(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error + '\n(Kiểm tra lại xem Mã Nhân viên có tồn tại không nha!)');
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteInsurance(id) {
    if (confirm(`Xóa sổ Bảo hiểm ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadInsurances(); 
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
    const ins = globalInsurances.find(i => i.Insurance_ID === id);
    if (!ins) return;

    const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = ins.Insurance_ID;
    document.getElementById('edit_emp_id').value = ins.Employee_ID || '';
    document.getElementById('edit_card').value = ins.Health_CardID || '';
    document.getElementById('edit_place').value = ins.Issued_Place || '';
    document.getElementById('edit_issued').value = formatDt(ins.Issued_Date);
    document.getElementById('edit_exp').value = formatDt(ins.Expiration_Date);

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateInsurance() {
    const id = document.getElementById('edit_id').value; 
    const updatedData = {
        Employee_ID: document.getElementById('edit_emp_id').value,
        Health_CardID: document.getElementById('edit_card').value,
        Issued_Place: document.getElementById('edit_place').value,
        Issued_Date: document.getElementById('edit_issued').value || null,
        Expiration_Date: document.getElementById('edit_exp').value || null
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
            loadInsurances(); 
        } else {
            const err = await response.json();
            alert('Lỗi: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadInsurances);