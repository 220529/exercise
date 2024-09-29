// 不带 async 和 defer 的脚本
document.addEventListener("DOMContentLoaded", () => {
  console.log("Default script loaded.");
  document.getElementById("title").style.fontSize = "2.5em";
  document.getElementById("description").innerText +=
    " (Modified by default script)";
});
