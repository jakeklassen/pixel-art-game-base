import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Loader } from 'resource-loader';
import bunnyUrl from './assets/bunny.png';
import visitorFontUrl from './assets/fonts/visitor/visitor1.ttf';
import { getResolution } from './lib/screen';

const GAME_WIDTH = 384;
const GAME_HEIGHT = 216;

const loader = new Loader();

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;
canvas.style.width = `${GAME_WIDTH}px`;
canvas.style.height = `${GAME_HEIGHT}px`;

export const IDENTITY_MATRIX: DOMMatrix2DInit = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
};

const resize = () => {
  // Scale canvas to fit window while maintaining 16x9
  const { innerWidth, innerHeight } = window;
  const { factor } = getResolution(
    innerWidth,
    innerHeight,
    GAME_WIDTH,
    GAME_HEIGHT,
  );

  canvas.style.transform = `scale(${factor})`;
  canvas.style.left = `${innerWidth / 2 - canvas.width / 2}px`;
  canvas.style.top = `${innerHeight / 2 - canvas.height / 2}px`;
};

resize();

window.addEventListener('resize', resize);

loader.add(bunnyUrl).load(async (loader, resources) => {
  const font = new FontFace('Visitor', `url(${visitorFontUrl})`);
  const visitorFont = await font.load();
  document.fonts.add(visitorFont);

  const bunnyResource = resources[bunnyUrl];

  if (bunnyResource == null) {
    throw new Error(`Could not load ${bunnyUrl}`);
  }

  const bunny = {
    pos: {
      x: 100,
      y: canvas.height / 2 - bunnyResource.data.height / 2,
    },
    dir: {
      x: 1,
      y: 1,
    },
    vel: {
      x: 30,
      y: 30,
    },
    sprite: bunnyResource.data as HTMLImageElement,
  };

  const FRAME_RATE = 1000 / 60;
  const STEP = 1 / 60;
  let currentFrame = 0;
  let lastFrame = 0;
  let dt = 0;
  let startTime: number;

  console.log({
    FRAME_RATE,
    STEP,
  });

  function frame(hrt: DOMHighResTimeStamp) {
    dt = 0;

    if (startTime == null) {
      startTime = hrt - 5;
    }

    currentFrame = Math.floor((hrt - startTime) / FRAME_RATE);
    dt = (currentFrame - lastFrame) * FRAME_RATE;

    if (dt > 0) {
      bunny.pos.x += bunny.vel.x * STEP * bunny.dir.x;
      bunny.pos.y += bunny.vel.y * STEP * bunny.dir.y;

      if (bunny.pos.x + bunny.sprite.width >= GAME_WIDTH) {
        bunny.pos.x = GAME_WIDTH - bunny.sprite.width;
        bunny.dir.x *= -1;
      } else if (bunny.pos.x <= 0) {
        bunny.pos.x = 0;
        bunny.dir.x *= -1;
      }

      if (bunny.pos.y + bunny.sprite.height >= GAME_HEIGHT) {
        bunny.pos.y = GAME_HEIGHT - bunny.sprite.height;
        bunny.dir.y *= -1;
      } else if (bunny.pos.y <= 0) {
        bunny.pos.y = 0;
        bunny.dir.y *= -1;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(Math.round(bunny.pos.x), Math.round(bunny.pos.y));

    ctx.drawImage(bunny.sprite, 0, 0);

    ctx.fillStyle = 'white';
    ctx.font = '10px Visitor';

    ctx.resetTransform();

    ctx.setTransform(IDENTITY_MATRIX);

    lastFrame = currentFrame;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
});
