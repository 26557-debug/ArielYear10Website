mainContent.style.display = "none";
// ====================== 在这里设置密码 ======================
const ALLOW_KEY = "mama_happy_birthday";   // 改成你想要的密码，只告诉指定的人
// ============================================================

const loginBox = document.getElementById("loginBox");
const mainContent = document.getElementById("mainContent");
const inputKey = document.getElementById("inputKey");
const errTip = document.getElementById("errTip");

const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");
let playing = false;

// 密码验证
inputKey.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = inputKey.value.trim();
    if (val === ALLOW_KEY) {
      loginBox.style.display = "none";
      mainContent.style.display = "block";
      autoPlayMusic();
    } else {
      errTip.style.display = "block";
      setTimeout(() => errTip.style.display = "none", 2000);
    }
  }
});

// 音乐
function autoPlayMusic() {
  musicBtn.click();
}
musicBtn.onclick = () => {
  if (!playing) {
    bgm.play();
    musicBtn.textContent = "🔇";
  } else {
    bgm.pause();
    musicBtn.textContent = "🔊";
  }
  playing = !playing;
};

// 彩屑
function createConfetti() {
  if (mainContent.style.display !== "block") return;
  const el = document.createElement("div");
  el.style.cssText = `
    position: fixed;
    width: 8px; height: 8px;
    background: rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255});
    left: ${Math.random()*100}vw;
    animation: fall ${Math.random()*4+3}s linear infinite;
    z-index: 1;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 7000);
}
setInterval(createConfetti, 200);

const style = document.createElement("style");
style.innerHTML = `@keyframes fall {
  0% { top: -10px; opacity:1; transform: rotate(0deg); }
  100% { top: 100vh; opacity:0; transform: rotate(360deg); }
}`;
document.head.appendChild(style);