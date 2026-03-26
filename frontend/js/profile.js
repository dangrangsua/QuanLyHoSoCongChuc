async function searchProfile() {
    const empId = document.getElementById('search_id').value.trim();
    if (!empId) {
        alert("Vui lòng nhập Mã nhân viên!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/employees/${empId}/profile`);
        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Không tìm thấy hồ sơ nhân viên này!");
            document.getElementById('profileContent').style.display = 'none';
            return;
        }

        document.getElementById('profileContent').style.display = 'block';

        const fmtDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : 'Nay';

        // 1. Render Thông tin cơ bản
        const info = data.info;
        const fullName = `${info.First_Name || ''} ${info.Middle_Name || ''} ${info.Last_Name || ''}`.trim();
        
        document.getElementById('basicInfo').innerHTML = `
            <div class="row mb-2">
                <div class="col-md-4"><p><strong>Họ và tên:</strong> <span class="text-primary fs-5 fw-bold">${fullName}</span></p></div>
                <div class="col-md-4"><p><strong>Mã NV:</strong> ${info.Employee_ID}</p></div>
                <div class="col-md-4"><p><strong>Trạng thái:</strong> <span class="badge bg-success">${info.Work_Status || '-'}</span></p></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-4"><p><strong>Ngày sinh:</strong> ${fmtDate(info.DOB)}</p></div>
                <div class="col-md-4"><p><strong>Giới tính:</strong> ${info.Gender || '-'}</p></div>
                <div class="col-md-4"><p><strong>CCCD:</strong> ${info.ID_Card || '-'}</p></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-4"><p><strong>Điện thoại:</strong> ${info.Phone || '-'}</p></div>
                <div class="col-md-4"><p><strong>Email:</strong> ${info.Email || '-'}</p></div>
                <div class="col-md-4"><p><strong>Quê quán:</strong> ${info.Hometown || '-'}</p></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-4"><p><strong>Dân tộc:</strong> ${info.Ethnicity || '-'} | <strong>Tôn giáo:</strong> ${info.Religion || '-'}</p></div>
                <div class="col-md-4"><p><strong>Lý luận CT:</strong> ${info.Political_Theory || '-'}</p></div>
                <div class="col-md-4"><p><strong>Ngày vào Đảng:</strong> ${fmtDate(info.Party_Join_Date) === 'Nay' ? '-' : fmtDate(info.Party_Join_Date)}</p></div>
            </div>
            <div class="row">
                <div class="col-md-12"><p><strong>Địa chỉ hiện tại:</strong> ${info.Current_Address || '-'}</p></div>
            </div>
        `;

        // 2. Render Quá trình công tác
        let workHTML = '<ul class="list-group list-group-flush">';
        if (data.workHistory.length === 0) workHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.workHistory.forEach(w => {
            workHTML += `<li class="list-group-item">
                <span class="badge bg-dark">${fmtDate(w.Start_Date)} - ${fmtDate(w.End_Date)}</span><br>
                🏢 ${w.Dept_Name || '-'} <br>
                🏅 Chức vụ: <strong>${w.Position_Name || '-'}</strong> <br>
                <small class="text-muted">Ghi chú: ${w.Descriptions || '-'}</small>
            </li>`;
        });
        workHTML += '</ul>';
        document.getElementById('workHistoryInfo').innerHTML = workHTML;

        // 3. Render Lịch sử Lương
        let salHTML = '<ul class="list-group list-group-flush">';
        if (data.salaryHistory.length === 0) salHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.salaryHistory.forEach(s => {
            salHTML += `<li class="list-group-item">
                <span class="badge bg-secondary">${fmtDate(s.Start_Date)} - ${fmtDate(s.End_Date)}</span><br>
                💰 Ngạch: <strong>${s.Rank_Name || '-'}</strong> | Hệ số: <strong class="text-danger">${s.Coefficient || '-'}</strong>
            </li>`;
        });
        salHTML += '</ul>';
        document.getElementById('salaryInfo').innerHTML = salHTML;

        // 4. Render Học vấn & Đào tạo (Gộp Chung)
        let eduHTML = '<ul class="list-group list-group-flush">';
        if (data.qualifications.length === 0) eduHTML += '<li class="list-group-item text-muted">Chưa có bằng cấp/chứng chỉ</li>';
        
        // Render Bằng ĐH
        data.degrees.forEach(d => {
            eduHTML += `<li class="list-group-item">
                🎓 <strong>${d.Degree_Name}</strong> (${d.Major}) - Xếp loại: <em>${d.Grade}</em><br>
                <small>Nơi cấp: ${d.Issued_By} | Ngày cấp: ${fmtDate(d.Issued_Date)}</small>
            </li>`;
        });
        // Render Khóa đào tạo
        data.trainings.forEach(t => {
            eduHTML += `<li class="list-group-item">
                🎯 Khóa học: <strong>${t.Trainning_Name}</strong> <br>
                <small>Tại: ${t.Location || t.Issued_By} | Thời gian: ${fmtDate(t.Start_Date)} - ${fmtDate(t.End_Date)}</small>
            </li>`;
        });
        eduHTML += '</ul>';
        document.getElementById('educationInfo').innerHTML = eduHTML;

        // 5. Render Đánh giá
        let assHTML = '<ul class="list-group list-group-flush">';
        if (data.assessments.length === 0) assHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.assessments.forEach(a => {
            let color = a.Rating === 'Xuất sắc' ? 'success' : (a.Rating === 'Yếu' ? 'danger' : 'primary');
            assHTML += `<li class="list-group-item">
                Kỳ: <strong>${a.On_Period}</strong> - Xếp loại: <span class="badge bg-${color}">${a.Rating}</span>
            </li>`;
        });
        assHTML += '</ul>';
        document.getElementById('assessmentInfo').innerHTML = assHTML;

        // 6. Render Khen thưởng / Kỷ luật
        let rewardHTML = '<ul class="list-group list-group-flush">';
        if (data.rewards.length === 0) rewardHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.rewards.forEach(r => {
            const rColor = r.Which_Type === 'Khen thưởng' ? 'text-success' : 'text-danger';
            rewardHTML += `<li class="list-group-item">
                <strong class="${rColor}">${r.Which_Type}</strong>: ${r.In_Form} (${fmtDate(r.Issued_Date)})<br>
                <small>Lý do: ${r.Reason || '-'}</small>
            </li>`;
        });
        rewardHTML += '</ul>';
        document.getElementById('rewardInfo').innerHTML = rewardHTML;

        // 7. Render Thân nhân
        let relHTML = '<ul class="list-group list-group-flush">';
        if (data.relatives.length === 0) relHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.relatives.forEach(r => {
            relHTML += `<li class="list-group-item">
                👨‍👩‍👦 <strong>${r.First_Name} ${r.Middle_Name || ''} ${r.Last_Name}</strong> 
                - Quan hệ: <span class="text-primary fw-bold">${r.Relationship}</span><br>
                <small>S/N: ${fmtDate(r.DOB)} | Nghề: ${r.Occupation || '-'} | SĐT/ĐC: ${r.Current_Address || '-'}</small>
            </li>`;
        });
        relHTML += '</ul>';
        document.getElementById('relativeInfo').innerHTML = relHTML;

        // 8. Render Bảo hiểm
        let insHTML = '<ul class="list-group list-group-flush">';
        if (data.insurance.length === 0) insHTML += '<li class="list-group-item">Chưa có dữ liệu</li>';
        data.insurance.forEach(i => {
            insHTML += `<li class="list-group-item">
                🛡️ Thẻ BHYT: <strong>${i.Health_CardID}</strong><br>
                <small>Nơi cấp: ${i.Issued_Place} | Hạn SD: ${fmtDate(i.Issued_Date)} - <strong class="text-danger">${fmtDate(i.Expiration_Date)}</strong></small>
            </li>`;
        });
        insHTML += '</ul>';
        document.getElementById('insuranceInfo').innerHTML = insHTML;

    } catch (error) {
        alert("Lỗi kết nối máy chủ!");
    }
}