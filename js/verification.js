function no_chinese_length_verification(str, len) {
    var temp = "";
    var s = str.split("", len);

    if (str.length > len) {
        if (s[len - 1].match(/[\u3105-\u3129]/g))
            s = str.split("".len + 3);
    }

    for (var key in s) {
        if (!(s[key].match(/[\u4E00-\u9FA5]/g) || s[key].match(/[\u3105-\u3129\u02Ca\u02C7\u02CB\u02D9]/g)))
            temp += s[key];
    }
    return temp;
}
//檢查email
function email_verification2(obj) {
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (obj.value != '') {
        if (obj.value.search(emailRule) != -1) {
            $('#email_msg').html('').removeClass('show');
        } else {
            $('#email_msg').html('請檢查email').addClass('show');
        }
    }
    else {
        $('#email_msg').html('').removeClass('show');
    }

}
//字串轉全形
function change_big_font_length_verification(str, len) {
    var tmp = new Array();
    var a = str;
    var b = "";

    for (var i = 0; i < a.length; i++) {
        if (a.charCodeAt(i) < 127 && a.charCodeAt(i) != 32) {
            tmp[i] = a.charCodeAt(i) + 65248;//轉全形unicode +65248
        }
        else if (a.charCodeAt(i) == 32) {
            tmp[i] = 12288;
        }
        else {
            tmp[i] = a.charCodeAt(i);
        }
        b += String.fromCharCode(tmp[i]);
    }
    return b;
}
//檢查字串長度（數字）
function number_length_verification(str, len) {
    var temp = "";

    for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58)
            temp += str.charAt(i);
    }
    return temp;
}
//檢查手機
function mobile_no_verification2(obj) {
    if (obj.value.length != 10 || obj.value.charAt(0) != 0 || obj.value.charAt(1) != 9)
        $('#mobile_msg').html('請檢查電話輸入是否正確').addClass('show');
    else
        $('#mobile_msg').html('').removeClass('show');
}
//驗證英文名字輸入
function eng_name_verification(str, len) {
    var temp = "";
    for (var i = 0; i < len; i++) {
        if ((str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) || str.charCodeAt(i) == 44 || str.charCodeAt(i) == 45 || str.charCodeAt(i) == 46 || str.charCodeAt(i) == 32)
            temp += str.charAt(i);
        else if (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)
            temp += str.charAt(i).toUpperCase();

    }
    return temp;
}

//驗證中文名字輸入
function chi_name_verification(str, len) {

    var temp = '';
    var s = str.split("", len);

    if (str.length > len) {
        if (s[len - 1].match(/[\u3105-\u3129]/g))
            s = str.split("".len + 3);
    }

    for (var key in s) {
        if (s[key].match(/[\u4E00-\u9FA5]/g) || s[key].match(/[\u3105-\u3129\u02Ca\u02C7\u02CB\u02D9]/g))
            temp += s[key];
    }
    return temp;

}

function chineseCheck(obj) {
    var s = $(obj).val();

    for (var i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) < 0x4E00 || s.charCodeAt(i) > 0x9FA5) {
            return "請輸入中文";
        }
    }
}

