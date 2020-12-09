export function validatedPhone(numberPhone) {
    var regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g

    if (numberPhone) {
        if (regexPhone.test(numberPhone) == false) {
            alert('Số điện thoại của bạn không đúng định dạng!')
            return false
        } else {
            return true
        }
    } else {
        alert('Bạn chưa điền số điện thoại!')
        return false
    }
}

export function validatedPassword(password) {
    if (password) {
        if (password.length >= 6) {
            return true
        } else {
            alert('Mật khẩu phải lớn hơn hoặc bằng 6 kí tự')
            return false
        }
    } else {
        alert('Bạn chưa điền mật khẩu')
        return false
    }
}

export function validatedText(text, message) {
    if (text) {
        return true
    } else {
        alert(`Bạn chưa điền vào ${message}`)
        return false
    }
}
