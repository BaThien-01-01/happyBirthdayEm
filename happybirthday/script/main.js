// trigger to play music in the background with sweetalert
window.addEventListener("load", () => {
  Swal.fire({
    title: "Bạn có muốn bật nhạc nền không?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có",
    cancelButtonText: "Không",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song")?.play();
      document.getElementById("toggleMusic").innerText = "Tắt nhạc";
    }
    animationTimeline();
  });
});

// 🎵 Toggle Play/Pause nhạc bằng nút
const musicBtn = document.getElementById("toggleMusic");
const song = document.querySelector(".song");

musicBtn.addEventListener("click", () => {
  if (!song) return;

  if (song.paused) {
    song.play();
    musicBtn.innerText = "Tắt nhạc";
  } else {
    song.pause();
    musicBtn.innerText = "Bật nhạc";
  }
});

// 🎬 Animation timeline
const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // ⚡ dùng GSAP mới
  const tl = gsap.timeline();

  tl.to(".container", { duration: 0.6, visibility: "visible" })
    .from(".one", { duration: 0.7, opacity: 0, y: 10 })
    .from(".two", { duration: 0.4, opacity: 0, y: 10 })
    .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=3.5")
    .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=1")
    .from(".three", { duration: 0.7, opacity: 0, y: 10 })
    .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=3")
    .from(".four", { duration: 0.7, scale: 0.2, opacity: 0 })
    .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 })
    .to(".hbd-chatbox span", { duration: 1.5, visibility: "visible", stagger: 0.05 })
    .to(".fake-btn", { duration: 0.1, backgroundColor: "rgb(127, 206, 248)" }, "+=4")
    .to(".four", { duration: 0.5, scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-3 strong", { duration: 0.5, scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
    .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-5", { duration: 0.7, rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
    .to(".idea-5 span", { duration: 0.7, rotation: 90, x: 8 }, "+=1.4")
    .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0 }, "+=2")
    .from(".idea-6 span", { duration: 0.8, scale: 3, opacity: 0, rotation: 15, ease: "expo.out", stagger: 0.2 })
    .to(".idea-6 span", { duration: 0.8, scale: 3, opacity: 0, rotation: -15, ease: "expo.out", stagger: 0.2 }, "+=1.5")
    .fromTo(".baloons img", { opacity: 0.9, y: 1400 }, { duration: 2.5, opacity: 1, y: -1000, stagger: 0.2 })
    .from(".profile-picture", { duration: 0.5, scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", { duration: 0.5, x: -100, y: 350, rotation: -180, opacity: 0 })
    .from(".wish-hbd span", { duration: 0.7, opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1, 0.5)", stagger: 0.1 })
    .fromTo(".wish-hbd span", { scale: 1.4, rotationY: 150 }, { duration: 0.7, scale: 1, rotationY: 0, color: "#ff69b4", ease: "expo.out", stagger: 0.1 }, "party")
    .from(".wish h5", { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .to(".eight svg", { duration: 1.5, visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4, stagger: 0.3 })
    .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: -1 })
    .from(".nine p", { duration: 1, ...ideaTextTrans, stagger: 1.2 })
    .to(".last-smile", { duration: 0.5, rotation: 90 }, "+=1");

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// ❤️ Heart animation
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 2 + Math.random() * 3 + "s";
  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}
setInterval(createHeart, 300);

// 🎊 Falling text animation
function createFallingText() {
  const textArray = ["🎂", "20t", "🎉", "15-10", "🎂", "Happy Birthday","Ngọc Hà"];
  const text = document.createElement("div");
  text.classList.add("falling-text");
  text.innerText = textArray[Math.floor(Math.random() * textArray.length)];

  text.style.left = Math.random() * 100 + "vw";
  text.style.animationDuration = 3 + Math.random() * 2 + "s";

  document.getElementById("text-fall-container").appendChild(text);

  setTimeout(() => {
    text.remove();
  }, 5000);
}
setInterval(createFallingText, 400);
