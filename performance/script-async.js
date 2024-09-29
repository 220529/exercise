// 使用 async 加载的脚本
document.addEventListener("DOMContentLoaded", () => {
  console.log("Async script loaded.");
  document.getElementById("title").style.color = "red";
  document.getElementById("description").innerText +=
    " (Modified by async script)";
});
