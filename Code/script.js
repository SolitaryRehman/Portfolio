console.log("script.js v6 loaded ✓");

const char1 = document.getElementById("char1");
const char2 = document.getElementById("char2");
const fire  = document.getElementById("fire");

const animations = {
  char1: {
    entry:    { image: "../character_anim/2D/Character_1/char_1_entry.png",          frames: 8,  frameWidth: 164, frameHeight: 143 },
    run:      { image: "../character_anim/2D/Character_1/char_1_run.png",            frames: 8,  frameWidth: 147, frameHeight: 164 },
    idle:     { image: "../character_anim/2D/Character_1/char_1_idle.png",           frames: 8,  frameWidth: 145, frameHeight: 144 },
    attack1:  { image: "../character_anim/2D/Character_1/char_1_attack_1.png",       frames: 7,  frameWidth: 200, frameHeight: 143 },
    attack2:  { image: "../character_anim/2D/Character_1/char_1_attack_2.png",       frames: 5,  frameWidth: 165, frameHeight: 139 },
    block:    { image: "../character_anim/2D/Character_1/char_1_block.png",          frames: 4,  frameWidth: 124, frameHeight: 141 },
    special1: { image: "../character_anim/2D/Character_1/char_1_special_part_1.png", frames: 8,  frameWidth: 110, frameHeight: 141 },
    lose:     { image: "../character_anim/2D/Character_1/char_1_lose.png",           frames: 5,  frameWidth: 138, frameHeight: 133 },
    get_hit:  { image: "../character_anim/2D/Character_1/char_1_get_hit.png",        frames: 3,  frameWidth: 145, frameHeight: 136 },
  },
  char2: {
    intro:     { image: "../character_anim/2D/Character_2/char_2_intro.png",      frames: 20, frameWidth: 128, frameHeight: 113 },
    idle:      { image: "../character_anim/2D/Character_2/char_2_idle.png",       frames: 6,  frameWidth: 73,  frameHeight: 121 },
    attack1:   { image: "../character_anim/2D/Character_2/char_2_attack_1.png",   frames: 16, frameWidth: 111, frameHeight: 125 },
    attack2:   { image: "../character_anim/2D/Character_2/char_2_attack_2.png",   frames: 14, frameWidth: 144, frameHeight: 121 },
    block:     { image: "../character_anim/2D/Character_2/char_2_block.png",      frames: 4,  frameWidth: 61,  frameHeight: 118 },
    dash:      { image: "../character_anim/2D/Character_2/char_2_dash.png",       frames: 4,  frameWidth: 104, frameHeight: 118 },
    jump:      { image: "../character_anim/2D/Character_2/char_2_jump.png",       frames: 12, frameWidth: 130, frameHeight: 154 },
    knockdown: { image: "../character_anim/2D/Character_2/char_2_knockdown.png",  frames: 21, frameWidth: 125, frameHeight: 125 },
    victory:   { image: "../character_anim/2D/Character_2/char_2_victory.png",    frames: 15, frameWidth: 102, frameHeight: 130 },
  },
  fire: {
    image: "../character_anim/2D/Character_1/char_1_special_part_2.png",
    frames: 13, frameWidth: 133, frameHeight: 68,
  }
};

const timeline = [
  { start: 0.00, end: 0.12, char1: "entry",   char2: "intro"     },
  { start: 0.12, end: 0.24, char1: "run",      char2: "block",    moveForward: true  },
  { start: 0.24, end: 0.34, char1: "idle",     char2: "dash",     dashLeft: true     },
  { start: 0.34, end: 0.46, char1: "block",    char2: "attack1"   },
  { start: 0.46, end: 0.60, char1: "attack2",  char2: "knockdown" },
  { start: 0.60, end: 0.76, char1: "special1", char2: "jump",     fire: true         },
  { start: 0.76, end: 0.88, char1: "block",    char2: "attack2"   },
  { start: 0.88, end: 1.00, char1: "lose",     char2: "victory"   },
];

const DISPLAY_HEIGHT = 350;

// ── NEW: img-based sprite renderer — no background-size/position math ─────────
function setSprite(el, anim, frame, displayHeight) {
  if (!anim) return;

  const scale  = displayHeight / anim.frameHeight;
  const frameW = Math.floor(anim.frameWidth  * scale);   // integer pixels
  const frameH = Math.floor(displayHeight);

  // Container = exactly one frame; overflow:hidden does the clipping
  el.style.width    = frameW + "px";
  el.style.height   = frameH + "px";
  el.style.overflow = "hidden";
  el.style.backgroundImage = "none";   // kill any leftover CSS background

  // Reuse or create the <img> child element
  let img = el._spriteImg;
  if (!img) {
    img = document.createElement("img");
    img.style.position       = "absolute";
    img.style.top            = "0";
    img.style.left           = "0";
    img.style.imageRendering = "pixelated";
    img.style.display        = "block";
    img.draggable            = false;
    el.appendChild(img);
    el._spriteImg = img;
  }

  // Update src only when animation changes (avoids reloads)
  if (img.dataset.src !== anim.image) {
    img.src            = anim.image;
    img.dataset.src    = anim.image;
  }

  // Stretch img to full sheet width; shift left to reveal the correct frame
  img.style.width  = (anim.frames * frameW) + "px";
  img.style.height = frameH + "px";
  img.style.left   = -(frame * frameW) + "px";
}

function getFrame(anim, progress) {
  return Math.min(anim.frames - 1, Math.floor(progress * anim.frames));
}

function update(overallProg) {
  let current = timeline[timeline.length - 1];
  for (const scene of timeline) {
    if (overallProg >= scene.start && overallProg <= scene.end) {
      current = scene;
      break;
    }
  }

  const localProg = Math.max(0, Math.min(1,
    (overallProg - current.start) / (current.end - current.start)
  ));

  const c1Anim = animations.char1[current.char1];
  if (c1Anim) setSprite(char1, c1Anim, getFrame(c1Anim, localProg), DISPLAY_HEIGHT);

  const c2Anim = animations.char2[current.char2];
  if (c2Anim) setSprite(char2, c2Anim, getFrame(c2Anim, localProg), DISPLAY_HEIGHT);

  let char1X = 0;
  let char2X = 0;
  if (current.moveForward) char1X =  localProg * 300;
  if (current.dashLeft)    char2X = -localProg * 250;

  char1.style.transform = `translateX(${char1X}px)`;
  char2.style.transform = `translateX(${char2X}px) scaleX(-1)`;

  if (current.char2 === "jump") {
    const jumpY = Math.sin(localProg * Math.PI) * -250;
    char2.style.transform = `translate(${char2X}px, ${jumpY}px) scaleX(-1)`;
  }

  if (current.fire) {
    const fireAnim = animations.fire;
    setSprite(fire, fireAnim, getFrame(fireAnim, localProg), 250);
    fire.style.opacity = "1";
    fire.style.left    = `${45 + localProg * 10}%`;
  } else {
    fire.style.opacity = "0";
  }
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  update(scrollTop / maxScroll);
});

document.addEventListener("DOMContentLoaded", () => update(0));