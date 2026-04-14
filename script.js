const USER_ID = "1469403001671389254";

// CONFIG
let config = {
  color: "#c77dff",
  links: {
    twitter: "",
    insta: "",
    tiktok: "",
    roblox: ""
  }
};

// LOAD CONFIG
function loadConfig() {
  const saved = JSON.parse(localStorage.getItem("config"));
  if (saved) config = saved;

  document.documentElement.style.setProperty("--main-color", config.color);

  twitter.href = config.links.twitter || "#";
  instagram.href = config.links.insta || "#";
  tiktok.href = config.links.tiktok || "#";
  roblox.href = config.links.roblox || "#";
}

// DISCORD
async function updateDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const data = await res.json();
    const user = data.data;

    username.innerText = user.discord_user.username;
    avatar.src =
      `https://cdn.discordapp.com/avatars/${USER_ID}/${user.discord_user.avatar}.png`;

    let text = "Idle...";
    const cover = document.getElementById("cover");
    const bg = document.getElementById("bg-overlay");

    if (user.listening_to_spotify) {
      text = ` ${user.spotify.song} - ${user.spotify.artist}`;

      cover.src = user.spotify.album_art_url;
      cover.style.display = "block";

      bg.style.backgroundImage =
        `url(${user.spotify.album_art_url})`;

    } else if (user.activities.length > 0) {
      text = ` ${user.activities[0].name}`;
      cover.style.display = "none";
      bg.style.backgroundImage = "none";
    } else {
      cover.style.display = "none";
      bg.style.backgroundImage = "none";
    }

    activity.innerText = text;

  } catch {}
}

setInterval(updateDiscord, 5000);
updateDiscord();

// 3D PARALLAX SUAVE
const card = document.getElementById("card");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  card.style.transform =
    `translate(-50%, -50%) rotateY(${x}deg) rotateX(${-y}deg)`;
});

// PARTÍCULAS SUAVES
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let p = [];

for (let i = 0; i < 60; i++) {
  p.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 2,
    v: Math.random() * 0.3
  });
}

function anim() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  p.forEach(pt => {
    pt.y += pt.v;
    if (pt.y > canvas.height) pt.y = 0;

    ctx.fillStyle = "rgba(200,100,255,0.5)";
    ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
  });
  requestAnimationFrame(anim);
}

anim();

loadConfig();
