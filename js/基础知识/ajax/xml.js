function fnXml({ method = "GET", url, bool = true, params = null }) {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest()
        xml.open(method, url, bool)
        xml.onreadystatechange = () => {
            if (xml.readyState === 4) {
                if (xml.status === 200) {
                    resolve(xml.responseText)
                } else {
                    reject("网络错误, 错误码：" + xml.status)
                }
            }
        }
        xml.send(params)
    })
}

function fnFetch({ method = "GET", url, bool = true, params = null }) {
    return new Promise((resolve, reject) => {
        fetch(url).then(r => {
            console.log("fetch.r", r.json())
        }).catch(err => {
            console.log("fetch.err", err)
        })
    })
}