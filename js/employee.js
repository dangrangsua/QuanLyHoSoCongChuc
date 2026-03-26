const API_URL = 'https://quanlyhosocongchuc.onrender.com/api';
let globalEmployees = []; 

// 1. TẢI DANH SÁCH
async function loadEmployees() {
    try {
        const response = await fetch(API_URL);
        globalEmployees = await response.json(); 

        const tableBody = document.getElementById('employeeList');
        tableBody.innerHTML = ''; 

        globalEmployees.forEach(emp => {
            const dob = emp.DOB ? new Date(emp.DOB).toLocaleDateString('vi-VN') : '';
            const fullName = `${emp.First_Name || ''} ${emp.Middle_Name || ''} ${emp.Last_Name || ''}`.replace(/\s+/g, ' ').trim();
            
            const row = `
                <tr>
                    <td><strong>${emp.Employee_ID}</strong></td>
                    <td><span class="text-primary fw-bold">${fullName}</span></td>
                    <td>${dob}</td>
                    <td>${emp.Phone || '-'}</td>
                    <td>${emp.Email || '-'}</td>
                    <td>${emp.Hometown || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal('${emp.Employee_ID}')">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteEmployee('${emp.Employee_ID}')">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('employeeList').innerHTML = '<tr><td colspan="7" class="text-danger">Lỗi kết nối Backend!</td></tr>';
    }
}

// 2. THÊM MỚI
async function addEmployee() {
    const newEmp = {
        Employee_ID: document.getElementById('add_id').value,
        First_Name: document.getElementById('add_first').value,
        Middle_Name: document.getElementById('add_middle').value,
        Last_Name: document.getElementById('add_last').value,
        Phone: document.getElementById('add_phone').value,
        Email: document.getElementById('add_email').value,
        DOB: document.getElementById('add_dob').value || null,
        Gender: document.getElementById('add_gender').value,
        Hometown: document.getElementById('add_hometown').value,
        ID_Card: document.getElementById('add_idcard').value,
        Work_Status: document.getElementById('add_status').value, 
        Ethnicity: document.getElementById('add_ethnicity').value,
        Religion: document.getElementById('add_religion').value,
        Political_Theory: document.getElementById('add_political').value, 
        Current_Address: document.getElementById('add_address').value, 
        Party_Join_Date: document.getElementById('add_party_date').value || null
    };

    if (!newEmp.Employee_ID || !newEmp.Last_Name) {
        alert("Mã NV và Tên không được để trống!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmp)
        });

        if (response.ok) {
            alert('Thêm thành công!');
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
            document.getElementById('addForm').reset(); 
            loadEmployees(); 
        } else {
            const err = await response.json();
            alert('Lỗi khi thêm: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

// 3. XÓA
async function deleteEmployee(id) {
    if (confirm(`Xóa nhân viên ${id}? Sẽ báo lỗi nếu nhân viên này đang có dữ liệu (Hợp đồng, Lương, Quá trình CT...)`)) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Xóa thành công!');
                loadEmployees(); 
            } else {
                alert('Lỗi: Nhân viên đang dính dữ liệu khóa ngoại ở bảng khác!');
            }
        } catch (error) {
            alert('Lỗi kết nối!');
        }
    }
}

// 4. MỞ FORM SỬA
function openEditModal(id) {
    const emp = globalEmployees.find(e => e.Employee_ID === id);
    if (!emp) return;

    const dobFormat = emp.DOB ? new Date(emp.DOB).toISOString().split('T')[0] : '';
    const partyDateFormat = emp.Party_Join_Date ? new Date(emp.Party_Join_Date).toISOString().split('T')[0] : '';

    document.getElementById('edit_id').value = emp.Employee_ID;
    document.getElementById('edit_first').value = emp.First_Name || '';
    document.getElementById('edit_middle').value = emp.Middle_Name || '';
    document.getElementById('edit_last').value = emp.Last_Name || '';
    document.getElementById('edit_phone').value = emp.Phone || '';
    document.getElementById('edit_email').value = emp.Email || '';
    document.getElementById('edit_dob').value = dobFormat;
    document.getElementById('edit_gender').value = emp.Gender || 'Nam';
    document.getElementById('edit_hometown').value = emp.Hometown || '';
    document.getElementById('edit_idcard').value = emp.ID_Card || '';
    document.getElementById('edit_status').value = emp.Work_Status || ''; 
    document.getElementById('edit_ethnicity').value = emp.Ethnicity || '';
    document.getElementById('edit_religion').value = emp.Religion || '';
    document.getElementById('edit_political').value = emp.Political_Theory || ''; 
    document.getElementById('edit_address').value = emp.Current_Address || ''; 
    document.getElementById('edit_party_date').value = partyDateFormat;

    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// 5. CẬP NHẬT
async function updateEmployee() {
    const id = document.getElementById('edit_id').value; 
    
    const updatedEmp = {
        First_Name: document.getElementById('edit_first').value,
        Middle_Name: document.getElementById('edit_middle').value,
        Last_Name: document.getElementById('edit_last').value,
        Phone: document.getElementById('edit_phone').value,
        Email: document.getElementById('edit_email').value,
        DOB: document.getElementById('edit_dob').value || null,
        Gender: document.getElementById('edit_gender').value,
        Hometown: document.getElementById('edit_hometown').value,
        ID_Card: document.getElementById('edit_idcard').value,
        Work_Status: document.getElementById('edit_status').value, 
        Ethnicity: document.getElementById('edit_ethnicity').value,
        Religion: document.getElementById('edit_religion').value,
        Political_Theory: document.getElementById('edit_political').value, 
        Current_Address: document.getElementById('edit_address').value, 
        Party_Join_Date: document.getElementById('edit_party_date').value || null
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmp)
        });

        if (response.ok) {
            alert('Cập nhật thành công!');
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            loadEmployees(); 
        } else {
            const err = await response.json();
            alert('Lỗi khi cập nhật: ' + err.error);
        }
    } catch (error) {
        alert('Lỗi kết nối!');
    }
}

document.addEventListener("DOMContentLoaded", loadEmployees);