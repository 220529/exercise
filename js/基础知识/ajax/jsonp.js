function fnJsonp(url, callbackName) {
    const scrEl = document.createElement("script")
    scrEl.src = url + "?callback=" + callbackName
    document.body.append(scrEl)
}