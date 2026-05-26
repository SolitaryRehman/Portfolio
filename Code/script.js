/*
=========================================
HOW YOUR SPRITES SHOULD BE ORGANIZED
=========================================

assets/
    char1/
        entry.png
        run.png
        attack1.png
        attack2.png
        block.png
        special1.png
        lose.png

    char2/
        entry.png
        block.png
        dash.png
        attack1.png
        knockdown.png
        jump.png
        attack2.png
        victory.png

    effects/
        fire.png

ALL OF THESE ARE SPRITE SHEETS:
- Frames in ONE ROW
- Equal distance
- Same frame size

=========================================
*/

const char1 = document.getElementById("char1");
const char2 = document.getElementById("char2");
const fire = document.getElementById("fire");

/*
=========================================
SPRITE CONFIG
=========================================
*/

const animations = {

  char1: {

    entry: {
      image: "../character_anim/2D/Character_1/char_1_entry.png",
      frames: 8,
      frameWidth: 350,
      fps: 12
    },

    run: {
      image: "../character_anim/2D/Character_1/char_1_run.png",
      frames: 10,
      frameWidth: 350,
      fps: 14
    },

    attack1: {
      image: "../character_anim/2D/Character_1/char_1_attack_1.png",
      frames: 8,
      frameWidth: 350,
      fps: 12
    },

    block: {
      image: "../character_anim/2D/Character_1/char_1_block.png",
      frames: 6,
      frameWidth: 350,
      fps: 10
    },

    attack2: {
      image: "../character_anim/2D/Character_1/char_1_attack_2.png",
      frames: 12,
      frameWidth: 350,
      fps: 14
    },

    special1: {
      image: "../character_anim/2D/Character_1/char_1_special_part_1.png",
      frames: 10,
      frameWidth: 350,
      fps: 14
    },

    lose: {
      image: "../character_anim/2D/Character_1/char_1_lose.png",
      frames: 10,
      frameWidth: 350,
      fps: 10
    }
  },

  char2: {

    entry: {
      image: "../character_anim/2D/Character_2/char_2_entry.png",
      frames: 8,
      frameWidth: 350,
      fps: 12
    },

    block: {
      image: "../character_anim/2D/Character_2/char_2_block.png",
      frames: 6,
      frameWidth: 350,
      fps: 10
    },

    dash: {
      image: "../character_anim/2D/Character_2/char_2_dash.png",
      frames: 10,
      frameWidth: 350,
      fps: 14
    },

    attack1: {
      image: "../character_anim/2D/Character_2/char_2_attack_1.png",
      frames: 8,
      frameWidth: 350,
      fps: 12
    },

    knockdown: {
      image: "../character_anim/2D/Character_2/char_2_knockdown.png",
      frames: 10,
      frameWidth: 350,
      fps: 10
    },

    jump: {
      image: "../character_anim/2D/Character_2/char_2_jump.png",
      frames: 8,
      frameWidth: 350,
      fps: 12
    },

    attack2: {
      image: "../character_anim/2D/Character_2/char_2_attack_2.png",
      frames: 10,
      frameWidth: 350,
      fps: 14
    },

    victory: {
      image: "../character_anim/2D/Character_2/char_2_victory.png",
      frames: 10,
      frameWidth: 350,
      fps: 10
    }
  },

  fire: {
    image: "../character_anim/2D/Character_1/char_1_special_part_2.png",
    frames: 12,
    frameWidth: 250
  }
};

/*
=========================================
TIMELINE
Each section = one sequence
=========================================
*/

const timeline = [
  {
    start: 0.00,
    end: 0.12,
    char1: "entry",
    char2: "entry"
  },

  {
    start: 0.12,
    end: 0.24,
    char1: "run",
    char2: "block",
    moveForward: true
  },

  {
    start: 0.24,
    end: 0.34,
    char1: "idle",
    char2: "dash",
    dashLeft: true
  },

  {
    start: 0.34,
    end: 0.46,
    char1: "block",
    char2: "attack1"
  },

  {
    start: 0.46,
    end: 0.60,
    char1: "attack2",
    char2: "knockdown"
  },

  {
    start: 0.60,
    end: 0.76,
    char1: "special1",
    char2: "jump",
    fire: true
  },

  {
    start: 0.76,
    end: 0.88,
    char1: "block",
    char2: "attack2"
  },

  {
    start: 0.88,
    end: 1.00,
    char1: "lose",
    char2: "victory"
  }
];

/*
=========================================
HELPERS
=========================================
*/

function setSprite(el, animation, frame) {

  if (!animation || animation === "idle") return;

  el.style.backgroundImage = `url(${animation.image})`;

  const x = -(frame * animation.frameWidth);

  el.style.backgroundPosition = `${x}px 0px`;
}

function getFrame(anim, progress) {

  const total = anim.frames;

  return Math.min(
    total - 1,
    Math.floor(progress * total)
  );
}

/*
=========================================
SCROLL ANIMATION
=========================================
*/

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const maxScroll =
    document.body.scrollHeight - window.innerHeight;

  const overallProgress = scrollTop / maxScroll;

  let current = timeline[0];

  for (const scene of timeline) {

    if (
      overallProgress >= scene.start &&
      overallProgress <= scene.end
    ) {
      current = scene;
      break;
    }
  }

  const localProgress =
    (overallProgress - current.start) /
    (current.end - current.start);

  /*
  =========================
  CHAR 1
  =========================
  */

  const c1Anim =
    animations.char1[current.char1];

  if (c1Anim) {

    const frame =
      getFrame(c1Anim, localProgress);

    setSprite(char1, c1Anim, frame);
  }

  /*
  =========================
  CHAR 2
  =========================
  */

  const c2Anim =
    animations.char2[current.char2];

  if (c2Anim) {

    const frame =
      getFrame(c2Anim, localProgress);

    setSprite(char2, c2Anim, frame);
  }

  /*
  =========================
  MOVEMENT
  =========================
  */

  let char1X = 0;
  let char2X = 0;

  if (current.moveForward) {

    char1X = localProgress * 300;
  }

  if (current.dashLeft) {

    char2X = -localProgress * 250;
  }

  char1.style.transform =
    `translateX(${char1X}px)`;

  char2.style.transform =
    `translateX(${char2X}px) scaleX(-1)`;

  /*
  =========================
  JUMP
  =========================
  */

  if (current.char2 === "jump") {

    const jumpY =
      Math.sin(localProgress * Math.PI) * -250;

    char2.style.transform =
      `translate(${char2X}px, ${jumpY}px) scaleX(-1)`;
  }

  /*
  =========================
  FIRE SPECIAL
  =========================
  */

  if (current.fire) {

    fire.style.opacity = 1;

    const fireAnim = animations.fire;

    fire.style.backgroundImage =
      `url(${fireAnim.image})`;

    const frame =
      getFrame(fireAnim, localProgress);

    const x =
      -(frame * fireAnim.frameWidth);

    fire.style.backgroundPosition =
      `${x}px 0px`;

    fire.style.left =
      `${45 + localProgress * 10}%`;
  }
  else {

    fire.style.opacity = 0;
  }

});