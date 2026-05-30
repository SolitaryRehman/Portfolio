console.log("script.js v7 loaded ✓");

const char1 = document.getElementById("char1");
const char2 = document.getElementById("char2");
const fire  = document.getElementById("fire");

// ─── ANIMATION DATA ──────────────────────────────────────────────────────────
// Every frame's x/y position is copied directly from the CSS sprite exports.
// sheetWidth/sheetHeight = actual full image dimensions (last frame x + frameWidth).
// Nothing is calculated or guessed — this is the single source of truth.

const animations = {

  char1: {

    entry: {
      image: "../character_anim/2D/Character_1/entry/spritesheet.png",
      frameWidth: 164, frameHeight: 143, sheetWidth: 1312, sheetHeight: 143,
      frames: [
        {x:0,y:0},{x:164,y:0},{x:328,y:0},{x:492,y:0},
        {x:656,y:0},{x:820,y:0},{x:984,y:0},{x:1148,y:0}
      ]
    },

    run: {
      image: "../character_anim/2D/Character_1/run/spritesheet.png",
      frameWidth: 147, frameHeight: 164, sheetWidth: 1176, sheetHeight: 164,
      frames: [
        {x:0,y:0},{x:147,y:0},{x:294,y:0},{x:441,y:0},
        {x:588,y:0},{x:735,y:0},{x:882,y:0},{x:1029,y:0}
      ]
    },

    idle: {
      image: "../character_anim/2D/Character_1/idle/spritesheet.png",
      frameWidth: 145, frameHeight: 144, sheetWidth: 870, sheetHeight: 144,
      frames: [
        {x:0,y:0},{x:145,y:0},{x:290,y:0},
        {x:435,y:0},{x:580,y:0},{x:725,y:0}
      ]
    },

    attack1: {
      image: "../character_anim/2D/Character_1/attack_1/spritesheet.png",
      frameWidth: 200, frameHeight: 143, sheetWidth: 1600, sheetHeight: 143,
      frames: [
        {x:0,y:0},{x:200,y:0},{x:400,y:0},{x:600,y:0},
        {x:800,y:0},{x:1000,y:0},{x:1200,y:0},{x:1400,y:0}
      ]
    },

    attack2: {
      image: "../character_anim/2D/Character_1/attack_2/spritesheet.png",
      frameWidth: 166, frameHeight: 139, sheetWidth: 830, sheetHeight: 139,
      frames: [
        {x:0,y:0},{x:166,y:0},{x:332,y:0},{x:498,y:0},{x:664,y:0}
      ]
    },

    block: {
      image: "../character_anim/2D/Character_1/block/spritesheet.png",
      frameWidth: 124, frameHeight: 141, sheetWidth: 496, sheetHeight: 141,
      frames: [
        {x:0,y:0},{x:124,y:0},{x:248,y:0},{x:372,y:0}
      ]
    },

    special1: {
      image: "../character_anim/2D/Character_1/special_part_1/spritesheet.png",
      frameWidth: 110, frameHeight: 141, sheetWidth: 660, sheetHeight: 141,
      frames: [
        {x:0,y:0},{x:110,y:0},{x:220,y:0},
        {x:330,y:0},{x:440,y:0},{x:550,y:0}
      ]
    },

    lose: {
      image: "../character_anim/2D/Character_1/lose/spritesheet.png",
      frameWidth: 138, frameHeight: 123, sheetWidth: 690, sheetHeight: 123,
      frames: [
        {x:0,y:0},{x:138,y:0},{x:276,y:0},{x:414,y:0},{x:552,y:0}
      ]
    },

    get_hit: {
      image: "../character_anim/2D/Character_1/get_hit/spritesheet.png",
      frameWidth: 145, frameHeight: 136, sheetWidth: 435, sheetHeight: 136,
      frames: [
        {x:0,y:0},{x:145,y:0},{x:290,y:0}
      ]
    },

  },

  char2: {

    intro: {
      image: "../character_anim/2D/Character_2/intro/spritesheet.png",
      frameWidth: 129, frameHeight: 113, sheetWidth: 3870, sheetHeight: 113,
      frames: [
        {x:0,y:0},{x:129,y:0},{x:258,y:0},{x:387,y:0},{x:516,y:0},
        {x:645,y:0},{x:774,y:0},{x:903,y:0},{x:1032,y:0},{x:1161,y:0},
        {x:1290,y:0},{x:1419,y:0},{x:1548,y:0},{x:1677,y:0},{x:1806,y:0},
        {x:1935,y:0},{x:2064,y:0},{x:2193,y:0},{x:2322,y:0},{x:2451,y:0},
        {x:2580,y:0},{x:2709,y:0},{x:2838,y:0},{x:2967,y:0},{x:3096,y:0},
        {x:3225,y:0},{x:3354,y:0},{x:3483,y:0},{x:3612,y:0},{x:3741,y:0}
      ]
    },

    idle: {
      // Multi-row sheet: 6 columns × 3 rows = 18 frames
      image: "../character_anim/2D/Character_2/idle/spritesheet.png",
      frameWidth: 73, frameHeight: 121, sheetWidth: 438, sheetHeight: 363,
      frames: [
        {x:0,y:0},  {x:73,y:0},  {x:146,y:0},{x:219,y:0},{x:292,y:0},{x:365,y:0},
        {x:0,y:121},{x:73,y:121},{x:146,y:121},{x:219,y:121},{x:292,y:121},{x:365,y:121},
        {x:0,y:242},{x:73,y:242},{x:146,y:242},{x:219,y:242},{x:292,y:242},{x:365,y:242}
      ]
    },

    attack1: {
      image: "../character_anim/2D/Character_2/attack_1/spritesheet.png",
      frameWidth: 111, frameHeight: 125, sheetWidth: 1776, sheetHeight: 125,
      frames: [
        {x:0,y:0},{x:111,y:0},{x:222,y:0},{x:333,y:0},{x:444,y:0},{x:555,y:0},
        {x:666,y:0},{x:777,y:0},{x:888,y:0},{x:999,y:0},{x:1110,y:0},{x:1221,y:0},
        {x:1332,y:0},{x:1443,y:0},{x:1554,y:0},{x:1665,y:0}
      ]
    },

    attack2: {
      image: "../character_anim/2D/Character_2/attack_2/spritesheet.png",
      frameWidth: 144, frameHeight: 121, sheetWidth: 2016, sheetHeight: 121,
      frames: [
        {x:0,y:0},{x:144,y:0},{x:288,y:0},{x:432,y:0},{x:576,y:0},{x:720,y:0},
        {x:864,y:0},{x:1008,y:0},{x:1152,y:0},{x:1296,y:0},{x:1440,y:0},{x:1584,y:0},
        {x:1728,y:0},{x:1872,y:0}
      ]
    },

    block: {
      image: "../character_anim/2D/Character_2/block/spritesheet.png",
      frameWidth: 61, frameHeight: 118, sheetWidth: 244, sheetHeight: 118,
      frames: [
        {x:0,y:0},{x:61,y:0},{x:122,y:0},{x:183,y:0}
      ]
    },

    dash: {
      image: "../character_anim/2D/Character_2/dash/spritesheet.png",
      frameWidth: 104, frameHeight: 118, sheetWidth: 416, sheetHeight: 118,
      frames: [
        {x:0,y:0},{x:104,y:0},{x:208,y:0},{x:312,y:0}
      ]
    },

    jump: {
      image: "../character_anim/2D/Character_2/jump/spritesheet.png",
      frameWidth: 130, frameHeight: 154, sheetWidth: 1690, sheetHeight: 154,
      frames: [
        {x:0,y:0},{x:130,y:0},{x:260,y:0},{x:390,y:0},{x:520,y:0},{x:650,y:0},
        {x:780,y:0},{x:910,y:0},{x:1040,y:0},{x:1170,y:0},{x:1300,y:0},{x:1430,y:0},
        {x:1560,y:0}
      ]
    },

    knockdown: {
      image: "../character_anim/2D/Character_2/knockdown/spritesheet.png",
      frameWidth: 127, frameHeight: 125, sheetWidth: 2540, sheetHeight: 125,
      frames: [
        {x:0,y:0},{x:127,y:0},{x:254,y:0},{x:381,y:0},{x:508,y:0},{x:635,y:0},
        {x:762,y:0},{x:889,y:0},{x:1016,y:0},{x:1143,y:0},{x:1270,y:0},{x:1397,y:0},
        {x:1524,y:0},{x:1651,y:0},{x:1778,y:0},{x:1905,y:0},{x:2032,y:0},{x:2159,y:0},
        {x:2286,y:0},{x:2413,y:0}
      ]
    },

    victory: {
      image: "../character_anim/2D/Character_2/victory/spritesheet.png",
      frameWidth: 102, frameHeight: 130, sheetWidth: 1734, sheetHeight: 130,
      frames: [
        {x:0,y:0},{x:102,y:0},{x:204,y:0},{x:306,y:0},{x:408,y:0},{x:510,y:0},
        {x:612,y:0},{x:714,y:0},{x:816,y:0},{x:918,y:0},{x:1020,y:0},{x:1122,y:0},
        {x:1224,y:0},{x:1326,y:0},{x:1428,y:0},{x:1530,y:0},{x:1632,y:0}
      ]
    },

  },

  fire: {
    image: "../character_anim/2D/Character_1/special_part_2/spritesheet.png",
    frameWidth: 133, frameHeight: 68, sheetWidth: 1596, sheetHeight: 68,
    frames: [
      {x:0,y:0},{x:133,y:0},{x:266,y:0},{x:399,y:0},{x:532,y:0},{x:665,y:0},
      {x:798,y:0},{x:931,y:0},{x:1064,y:0},{x:1197,y:0},{x:1330,y:0},{x:1463,y:0}
    ]
  }

};

// ─── TIMELINE ────────────────────────────────────────────────────────────────
const timeline = [
  { start: 0.00, end: 0.12, char1: "entry",   char2: "intro"     },
  { start: 0.12, end: 0.24, char1: "run",      char2: "block",    moveForward: true },
  { start: 0.24, end: 0.34, char1: "idle",     char2: "dash",     dashLeft: true    },
  { start: 0.34, end: 0.46, char1: "block",    char2: "attack1"   },
  { start: 0.46, end: 0.60, char1: "attack2",  char2: "knockdown" },
  { start: 0.60, end: 0.76, char1: "special1", char2: "jump",     fire: true        },
  { start: 0.76, end: 0.88, char1: "block",    char2: "attack2"   },
  { start: 0.88, end: 1.00, char1: "lose",     char2: "victory"   },
];

const DISPLAY_HEIGHT = 350;

// ─── SPRITE RENDERER ─────────────────────────────────────────────────────────
// All dimensions scale by the same factor — no drift, no bleed possible.
function setSprite(el, anim, frameIndex, displayHeight) {
  if (!anim || !anim.frames[frameIndex]) return;

  const frame = anim.frames[frameIndex];
  const scale = displayHeight / anim.frameHeight;

  el.style.width              = `${anim.frameWidth  * scale}px`;
  el.style.height             = `${displayHeight}px`;
  el.style.backgroundImage    = `url('${anim.image}')`;
  el.style.backgroundSize     = `${anim.sheetWidth  * scale}px ${anim.sheetHeight * scale}px`;
  el.style.backgroundRepeat   = "no-repeat";
  el.style.backgroundPosition = `${-frame.x * scale}px ${-frame.y * scale}px`;
}

function getFrame(anim, progress) {
  return Math.min(anim.frames.length - 1, Math.floor(progress * anim.frames.length));
}

// ─── MAIN UPDATE ─────────────────────────────────────────────────────────────
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

  /* ── CHAR 1 ── */
  const c1Anim = animations.char1[current.char1];
  if (c1Anim) setSprite(char1, c1Anim, getFrame(c1Anim, localProg), DISPLAY_HEIGHT);

  /* ── CHAR 2 ── */
  const c2Anim = animations.char2[current.char2];
  if (c2Anim) setSprite(char2, c2Anim, getFrame(c2Anim, localProg), DISPLAY_HEIGHT);

  /* ── POSITIONAL MOVEMENT ── */
  let char1X = 0;
  let char2X = 0;

  if (current.moveForward) char1X =  localProg * 300;
  if (current.dashLeft)    char2X = -localProg * 250;

  char1.style.transform = `translateX(${char1X}px)`;
  char2.style.transform = `translateX(${char2X}px) scaleX(-1)`;

  /* ── JUMP ARC ── */
  if (current.char2 === "jump") {
    const jumpY = Math.sin(localProg * Math.PI) * -250;
    char2.style.transform = `translate(${char2X}px, ${jumpY}px) scaleX(-1)`;
  }

  /* ── FIRE EFFECT ── */
  if (current.fire) {
    const fireAnim = animations.fire;
    setSprite(fire, fireAnim, getFrame(fireAnim, localProg), 250);
    fire.style.opacity = "1";
    fire.style.left    = `${45 + localProg * 10}%`;
  } else {
    fire.style.opacity = "0";
  }
}

// ─── SCROLL LISTENER ─────────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  update(scrollTop / maxScroll);
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => update(0));