const URP_API_POST_NOTIFYCATION =
    'https://qlnscloud.herokuapp.com/notifycation/ThemThongBao?token='

export function pushNotify(body, token) {
    fetch(URP_API_POST_NOTIFYCATION + token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.success) {
                console.log('Them thong bao thanh cong')
            } else {
                console.log('Them thong bao khong thanh cong')
            }
        })
        .catch((error) => {
            console.log('Lỗi', error)
        })
}
