//Thêm dấu phẩy cho tiền
export function comma(number) {
    number = '' + number;
    if (number.length > 3) {
        var mod = number.length % 3;
        var output = (mod > 0 ? (number.substring(0, mod)) : '');
        for (let i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod === 0) && (i === 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    } else return number;
}

//Bỏ dấu phẩy cho tiền
export function noComma(number) {
    const len = number.length / 4;
    for (var i = 0; i < len; i++) {
        number = number.replace('.', '');
    }
    return parseInt(number);
}

export function setWithExpiry(key, value, ttl = 1) {
    const item = {
        value: value,
        expiry: new Date().getTime() + ttl * 86400000,
    }
    localStorage.setItem(key, JSON.stringify(item))
}
export function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    if (new Date().getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

export function renderImageLink(data, type) {
    // let link = data.slice(0, data.lastIndexOf('.jpg'));
    let link = data
    switch (type) {
        case 0:
            //thumb
            link += '_s.jpg';
            break;
        case 1:
            // Small thumb for add product
            link += '_q.jpg';
            break;
        case 2:
            // medium thumb for index product
            link += '_n.jpg';
            break;
        case 3:
            // large thumb for product
            link += '.jpg';
            break;
        case 4:
            // biggest img for slide
            link += '_b.jpg';
            break;
        default:
            link += '_o.jpg';
            break;
    }
    return link;
}

export function formatDateTime(date, isTime=true) {
    let d = new Date(date);
    if (isTime) {
        return new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(d)
    }else{
        return new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(d)
    }
}
export function sortJSON(arr = [], prop = "", asc = true) {
    arr.sort(function (a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (a[prop] < b[prop]) ? 1 : ((a[prop] > b[prop]) ? -1 : 0);
        }
    });
    return arr;
}
export function asyncShopcart (localCart, serverCart){
    for (let i = 0; i < serverCart.length; i++) {
        const item = serverCart[i];
        for (let j = 0; j < localCart.length; j++) {
            const item2 = localCart[j];
            if (
                item.product.id === item2.product.id &&
                item.type === item2.type
            ) {
                localCart[j].id=item.id;
                serverCart[i] = null;
            }
        }
    }
    localCart.push(...serverCart);
    return localCart.filter((item) => {
        return item != null;
    });
};
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}