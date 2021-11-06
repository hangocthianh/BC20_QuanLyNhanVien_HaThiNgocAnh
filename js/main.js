// Global
function getELE(id) {
    return document.getElementById(id);
}
var staffList = new StaffList;
var valid = new Validation;

// LocalStorage
function setLocalStorage(array) {
    localStorage.setItem("LIST", JSON.stringify(array));
}
function getLocalStorage() {
    if (localStorage.getItem("LIST") != null) {
        staffList.arrStaff = JSON.parse(localStorage.getItem("LIST"));
        showTable(staffList.arrStaff);
    }
}
getLocalStorage();

// lấy thông tin NV
function getInfo() {
    var acc = getELE("tknv").value;
    var nam = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var sal = getELE("luongCB").value;
    var pos = getELE("chucvu").value;
    var time = getELE("gioLam").value;
    if (validation(acc, nam, email, pass, date, sal, time)) {
        var staff = new Staff(acc.trim(), nam, email, pass, date, Number(sal), pos, Number(time));
        staff.totalSalary = staff.totalSal();
        staff.rating = staff.ratingSta();
        staffList.addStaff(staff);
        showTable(staffList.arrStaff);
        setLocalStorage(staffList.arrStaff);
    }
}
getELE("btnThemNV").onclick = getInfo;

//kiểm tra thông tin 
function validation(acc, nam, email, pass, date, sal, time) {
    var isvalid = true;
    isvalid &= valid.checkEmpty(acc, "Tài khoản không được để trống!", "tbTKNV") && valid.checkAcount(acc, "Tài khoản bị trùng!", "tbTKNV", staffList.arrStaff);
    isvalid &= valid.checkEmpty(nam, "Họ và tên không được để trống!", "tbTen") && valid.checkName(nam, "Họ và tên phải là ký tự chữ", "tbTen");
    isvalid &= valid.checkEmpty(email, "Email không được để trống!", "tbEmail") && valid.checkEmail(email, "Email chưa đúng định dạng!", "tbEmail");
    isvalid &= valid.checkEmpty(pass, "Mật khẩu không được để trống!", "tbMatKhau") && valid.checkPass(pass, "Mật khẩu chưa đúng định dạng!", "tbMatKhau");
    isvalid &= valid.checkDate(date, "Ngày tháng năm không hợp lệ!", "tbNgay");
    isvalid &= valid.checkEmpty(sal, "Lương cơ bản không được để trống!", "tbLuongCB") && valid.checkSalary(sal, "Lương phải từ 1,000,000 đến 20,000,000 (VND)", "tbLuongCB");
    isvalid &= valid.checkPosition("chucvu", "Hãy chọn chức vụ!", "tbChucVu");
    isvalid &= valid.checkEmpty(time, "Số giờ làm việc không được để trống!", "tbGiolam") && valid.checkTime(time, "Số giờ làm việc phải từ 80 đến 200", "tbGiolam");
    return isvalid;
}
//kiểm tra thông tin khi cập nhật
function validationUpdate(nam, email, pass, date, sal, time) {
    var isvalid = true;
    isvalid &= valid.checkEmpty(nam, "Họ và tên không được để trống!", "tbTen") && valid.checkName(nam, "Họ và tên phải là ký tự chữ", "tbTen");
    isvalid &= valid.checkEmpty(email, "Email không được để trống!", "tbEmail") && valid.checkEmail(email, "Email chưa đúng định dạng!", "tbEmail");
    isvalid &= valid.checkEmpty(pass, "Mật khẩu không được để trống!", "tbMatKhau") && valid.checkPass(pass, "Mật khẩu chưa đúng định dạng!", "tbMatKhau");
    isvalid &= valid.checkDate(date, "Ngày tháng năm không hợp lệ!", "tbNgay");
    isvalid &= valid.checkEmpty(sal, "Lương cơ bản không được để trống!", "tbLuongCB") && valid.checkSalary(sal, "Lương phải từ 1,000,000 đến 20,000,000 (VND)", "tbLuongCB");
    isvalid &= valid.checkPosition("chucvu", "Hãy chọn chức vụ!", "tbChucVu");
    isvalid &= valid.checkEmpty(time, "Số giờ làm việc không được để trống!", "tbGiolam") && valid.checkTime(time, "Số giờ làm việc phải từ 80 đến 200", "tbGiolam");
    return isvalid;
}

// hiện bảng thông tin NV
function showTable(arr) {
    content = "";
    for (var i = 0; i < arr.length; i++) {
        var trStaff = `<tr>
            <td>${arr[i].account}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].date}</td>
            <td>${arr[i].position}</td>
            <td>${arr[i].totalSalary}</td>
            <td>${arr[i].rating}</td>
            <td>
                <button onclick="delStaff('${arr[i].account}')" class="btn btn-danger">Xóa</button>
                <button onclick="seeStaff('${arr[i].account}')" class="btn btn-info" data-toggle="modal"
                data-target="#myModal">Xem</button>
            </td>
        </tr>`
        content += trStaff;
    }
    getELE("tableDanhSach").innerHTML = content;
}

// xóa Nhân viên
function delStaff(acc) {
    staffList.deleteStaff(acc);
    setLocalStorage(staffList.arrStaff);
    showTable(staffList.arrStaff);
}

// xem chi tiết
function seeStaff(acc) {
    var foundSta = staffList.getDetail(acc);
    if (foundSta != undefined) {
        getELE("tknv").disabled = true;
        getELE("tknv").value = foundSta.account;
        getELE("name").value = foundSta.name;
        getELE("email").value = foundSta.email;
        getELE("password").value = foundSta.pass;
        getELE("datepicker").value = foundSta.date;
        getELE("luongCB").value = foundSta.salary;
        getELE("chucvu").value = foundSta.position;
        getELE("gioLam").value = foundSta.time;
    } else {
        alert("Không tìm thấy!");
    }
}
// cập nhật
function update() {
    var acc = getELE("tknv").value;
    var nam = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var sal = getELE("luongCB").value;
    var pos = getELE("chucvu").value;
    var time = getELE("gioLam").value;
    if (validationUpdate(nam, email, pass, date, sal, time)) {
        var staff = new Staff(acc.trim(), nam, email, pass, date, Number(sal), pos, Number(time));
        staff.totalSalary = staff.totalSal();
        staff.rating = staff.ratingSta();
        staffList.updateStaff(staff);
        showTable(staffList.arrStaff);
        setLocalStorage(staffList.arrStaff);
    }
}
getELE("btnCapNhat").onclick = update;

getELE("btnTimNV").onclick = function(){
    var keyWord = getELE("searchName").value;
    var arrkeyWord = staffList.searchStaff(keyWord);
    showTable(arrkeyWord);
}
getELE("searchName").onkeyup = function(){
    var keyWord = getELE("searchName").value;
    var arrkeyWord = staffList.searchStaff(keyWord);
    showTable(arrkeyWord);
}