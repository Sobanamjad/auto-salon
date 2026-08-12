function CheckForm_TS() {
    var form = document.my_form;
    if (!form) {
        return true;
    }

    if (!form.name.value.replace(/^\s+|\s+$/g, '')) {
        alert('請輸入姓名');
        form.name.focus();
        return false;
    }

    if (!form.mobile.value.replace(/^\s+|\s+$/g, '')) {
        alert('請輸入連絡電話');
        form.mobile.focus();
        return false;
    }

    if (!form.message.value.replace(/^\s+|\s+$/g, '')) {
        alert('請輸入內容');
        form.message.focus();
        return false;
    }

    if (!form.code.value.replace(/^\s+|\s+$/g, '')) {
        alert('請輸入驗證碼');
        form.code.focus();
        return false;
    }

    return true;
}

function refreshContactCaptcha() {
    var img = document.getElementById('i593');
    if (img) {
        img.src = '/contact/captcha?' + new Date().getTime();
    }
    return false;
}
