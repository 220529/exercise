function fnBindEvent(el, type, selector, fn) {
    if (!fn) {
        fn = selector
        selector = null
    }
    el.addEventListener(type, function (e) {
        const target = e.target
        e.preventDefault();
        // e.stopPropagation();
        // 事件代理
        if (selector) {
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn.call(el, e)
        }
    })
}

const div1 = document.getElementById("btn1");
const div3 = document.getElementById("div3");

fnBindEvent(div1, "click", function (e) {
    console.log("div1", this.innerHTML)
})

fnBindEvent(div3, "click", function (e) {
    console.log("div3", this.innerHTML)
})

fnBindEvent(div3, "click", ".abc", function (e) {
    // e.preventDefault();
    e.stopPropagation()
    console.log("div3.a", this.innerHTML)
})