// 使用 defer 加载的脚本
document.addEventListener("DOMContentLoaded", () => {
  console.log("Defer script loaded.");
  document.body.style.backgroundColor = "#e0ffe0";
  document.getElementById("description").innerText +=
    " (Modified by defer script)";
});
