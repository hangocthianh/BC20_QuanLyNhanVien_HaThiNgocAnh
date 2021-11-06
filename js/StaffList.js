function StaffList(){
    this.arrStaff = [];
    this.addStaff = function(sta){
        this.arrStaff.push(sta);
    }
    // tìm account
    this.findStaff = function(acc){
        var i = -1;
        this.arrStaff.map(function(sta,index){
            if(sta.account == acc){
                i = index;
            }
        });
        return i;
    }
    // xóa nhân viên theo acc tìm dc
    this.deleteStaff = function(acc){
        var index = this.findStaff(acc);
        if(index > -1){
            this.arrStaff.splice(index, 1);
        }
    }
    // xem thông tin nv
    this.getDetail = function(acc){
        var index = this.findStaff(acc);
        if(index > -1){
            return this.arrStaff[index];
        } else{
            alert("Không tìm thấy!");
        }
    }
    // cập nhật
    this.updateStaff = function(staffUpdate){
        var index = this.findStaff(staffUpdate.account);
        if(index > -1){
            this.arrStaff[index] = staffUpdate;
        } else{
            alert("Không tìm thấy!");
        }
    }

    //tìm kiếm NV theo xếploai
    this.searchStaff = function(keyWord){
        var arrKeyWord = [];
        var searchWord = keyWord.trim().toLowerCase();
        this.arrStaff.map(function(staff){
            var rating = staff.rating.trim().toLowerCase();
            if(rating.indexOf(searchWord) >-1){
                arrKeyWord.push(staff);
            }
        });
        return arrKeyWord;
    }
}