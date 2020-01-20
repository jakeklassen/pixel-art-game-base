import MainLoop from 'mainloop.js';
import { Loader } from 'resource-loader';
import bunnyUrl from './assets/bunny.png';
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

loader.add(bunnyUrl).load((loader, resources) => {
  const bunnyResource = resources[bunnyUrl];

  if (bunnyResource == null) {
    throw new Error(`Could not load ${bunnyUrl}`);
  }

  const bunny = {
    pos: {
      x: bunnyResource.data.width / 2,
      y: canvas.height / 2 - bunnyResource.data.height / 2,
    },
    dir: {
      x: 1,
      y: 0,
    },
    lastPos: {
      x: bunnyResource.data.width / 2,
      y: canvas.height / 2 - bunnyResource.data.height / 2,
    },
    vel: {
      x: 20,
      y: 0,
    },
    sprite: bunnyResource.data as HTMLImageElement,
  };

  const TARGET_FPS = 50;
  const STEP = 1000 / TARGET_FPS;
  let last = performance.now();
  let dt = 0;

  function frame(hrt: DOMHighResTimeStamp) {
    dt += hrt - last;

    while (dt >= STEP) {
      bunny.lastPos.x = bunny.pos.x;
      bunny.lastPos.y = bunny.pos.y;
      bunny.pos.x += (bunny.vel.x / STEP) * bunny.dir.x;
      bunny.pos.y += (bunny.vel.y / STEP) * bunny.dir.y;

      if (bunny.pos.x + bunny.sprite.width >= GAME_WIDTH) {
        bunny.pos.x = GAME_WIDTH - bunny.sprite.width;
        bunny.dir.x *= -1;
      } else if (bunny.pos.x <= 0) {
        bunny.pos.x = 0;
        bunny.dir.x *= -1;
      }

      dt -= STEP;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20 - 0.5, 0);
    ctx.lineTo(20 - 0.5, GAME_HEIGHT);
    ctx.moveTo(40 - 0.5, 0);
    ctx.lineTo(40 - 0.5, GAME_HEIGHT);
    ctx.moveTo(60 - 0.5, 0);
    ctx.lineTo(60 - 0.5, GAME_HEIGHT);
    ctx.moveTo(80 - 0.5, 0);
    ctx.lineTo(80 - 0.5, GAME_HEIGHT);
    ctx.stroke();

    ctx.translate(bunny.pos.x | 0, bunny.pos.y | 0);

    ctx.drawImage(bunny.sprite, 0, 0);

    ctx.setTransform(IDENTITY_MATRIX);

    last = hrt;

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
});
