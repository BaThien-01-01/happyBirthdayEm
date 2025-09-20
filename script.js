// Matrix canvas effect
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "CAO THI NGOC HA♥";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillStyle = char === "♥" ? "#ff4d4d" : "#FF1919";
    ctx.globalAlpha = char === "♥" ? 0.3 + Math.random() * 0.7 : 1;
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }

  ctx.globalAlpha = 1;
}
setInterval(drawMatrix, 35);

// Countdown
const countdownEl = document.getElementById("countdown");
let count = 3;
let countdownInterval;
let textInterval;

const texts = document.querySelectorAll(".center-text");
const bgMusic = document.getElementById("bgMusic");
const replayBtn = document.getElementById("replayBtn");
const manualPlayBtn = document.getElementById("manualPlayBtn");

function startCountdown() {
  count = 3;
  countdownEl.textContent = count;
  countdownEl.style.display = "block";

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownEl.style.display = "none";
      showTextOneByOne();
    }
  }, 1000);
}

function showTextOneByOne() {
  let currentIndex = 0;
  let previousIndex = null;

  textInterval = setInterval(() => {
    if (previousIndex !== null) {
      texts[previousIndex].classList.remove("show");
      texts[previousIndex].classList.add("fade-out");
    }

    if (currentIndex < texts.length) {
      texts[currentIndex].classList.remove("fade-out");
      texts[currentIndex].classList.add("show");
      previousIndex = currentIndex;
      currentIndex++;
    } else {
      clearInterval(textInterval);

      // ⏳ Sau 4 giây thì tự động chuyển sang trang khác
      setTimeout(() => {
        window.location.href = "./churoi/new.html"; // 🔗 thay bằng file HTML bạn muốn
      }, 3000);
    }
  }, 3000);
}



replayBtn.addEventListener("click", () => {
  // Fade-out trước khi chuyển trang
  replayBtn.classList.remove("show");
  replayBtn.classList.add("hidden");

  setTimeout(() => {
    window.location.href = "./happybirthday/index.html";
  }, 800); // chờ hiệu ứng mượt rồi mới chuyển
});


// Music popup logic (luôn hiện mỗi lần vào hoặc bấm lại)
function showMusicPopup() {
  const popup = document.getElementById("musicPopup");
  const acceptBtn = document.getElementById("acceptMusic");
  const declineBtn = document.getElementById("declineMusic");

  popup.classList.remove("hidden");

  function hidePopup() {
    popup.classList.add("hidden");
  }

  acceptBtn.onclick = () => {
    bgMusic.play().catch(() => {
      manualPlayBtn.classList.remove("hidden");
    });
    hidePopup();
    startCountdown();
  };

  declineBtn.onclick = () => {
    hidePopup();
    startCountdown();
  };
}

// Tự gọi khi load
window.addEventListener("load", showMusicPopup);

// Nút phát nhạc thủ công nếu bị chặn
manualPlayBtn.addEventListener("click", () => {
  bgMusic.play().then(() => {
    manualPlayBtn.classList.add("hidden");
  }).catch(() => {
    alert("Trình duyệt vẫn chặn phát nhạc. Hãy nhấn thêm lần nữa hoặc kiểm tra quyền âm thanh.");
  });
});
