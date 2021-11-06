function Staff(acc, nam, email, pass, date, sal, pos, time) {
    this.account = acc;
    this.name = nam;
    this.email = email;
    this.pass = pass;
    this.date = date;
    this.salary = sal;
    this.position = pos;
    this.time = time;
    this.totalSalary = 0;
    this.rating = "";
    this.totalSal = function () {
        if (this.position == "Sếp") {
            return this.salary * 3;
        } else if (this.position == "Trưởng phòng") {
            return this.salary * 2;
        } else if (this.position == "Nhân viên") {
            return this.salary;
        } else{
            alert("Hãy chọn chức vụ!");
        }
    }
    this.ratingSta = function () {
        if (this.time >= 192) {
            return "Xuất sắc";
        } else if (this.time >= 176) {
            return "Giỏi";
        } else if (this.time >= 160) {
            return "Khá";
        } else {
            return "Trung Bình";
        }
    }
}