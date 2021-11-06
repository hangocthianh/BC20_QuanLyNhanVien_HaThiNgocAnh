function getEle(id) {
    return document.getElementById(id);
}
function Validation() {
    // kiểm tra rỗng
    this.checkEmpty = function (value, message, spanID) {
        if (value.trim() != "") {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra tk trùng không
    this.checkAcount = function (value, message, spanID, arrStaff) {
        var isExist = false;
        isExist = arrStaff.some(function (ar) {
            return value.trim() == ar.account;
        })
        if (isExist) {
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
        getEle(spanID).innerHTML = "";
        getEle(spanID).style.display = "none";
        return true;
    }
    // kiểm tra tên là ký tự chữ
    this.checkName = function (value, message, spanID) {
        var pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        var reg = new RegExp(pattern);
        if (value.match(reg)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra email hợp lệ
    this.checkEmail = function (value, message, spanID) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra mật khẩu hợp lệ
    this.checkPass = function (value, message, spanID) {
        var pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra ngày hợp lệ
    this.checkDate = function (value, message, spanID) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra lương
    this.checkSalary = function (value, message, spanID) {
        var pattern = /^(\d{7,8}(\.\d{7,8})?)$/;
        if (value.match(pattern) && value >= 1e+6 && value <= 20e+6) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra chọn chức vụ
    this.checkPosition = function (selectID, message, spanID) {
        if (getEle(selectID).selectedIndex != 0) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }

    // kiểm tra giờ làm việc
    this.checkTime = function (value, message, spanID) {
        var pattern = /^(\d{2,3}(\.\d{2,3})?)$/;
        if (value.match(pattern) && value >= 80 && value <= 200) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
}