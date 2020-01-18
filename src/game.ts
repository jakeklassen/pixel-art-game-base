import * as dat from 'dat.gui';
import { Loader } from 'resource-loader';
import bunnyUrl from './assets/bunny.png';
import visitorFontUrl from './assets/fonts/visitor/visitor1.ttf';
import { getResolution } from './lib/screen';

const GAME_WIDTH = 384;
const GAME_HEIGHT = 216;
const TARGET_FPS = 60;
const STEP = 1 / TARGET_FPS;

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

  const sprite = resources[bunnyUrl];

  if (sprite == null) {
    throw new Error(`Could not load ${bunnyUrl}`);
  }

  const player = {
    pos: {
      x: sprite.data.width / 2,
      y: canvas.height / 2 - sprite.data.height / 2,
    },
    lastPos: {
      x: sprite.data.width / 2,
      y: canvas.height / 2 - sprite.data.height / 2,
    },
    vel: {
      x: 20,
      y: 0,
    },
    dir: {
      x: 1,
      y: 0,
    },
    sprite: sprite.data as HTMLImageElement,
  };

  const gui = new dat.GUI();

  gui.add(player.vel, 'x', 0, 200, 1);

  let dt = 0;
  let last = performance.now();

  function frame(hrt: DOMHighResTimeStamp) {
    // One additional note is that requestAnimationFrame might pause if our browser
    // loses focus, resulting in a very, very large dt after it resumes.
    // We can workaround this by limiting the delta to one second:
    dt = dt + Math.min(1, (hrt - last) / 1000);

    while (dt > STEP) {
      dt -= STEP;

      player.lastPos.x = player.pos.x;
      player.lastPos.y = player.pos.y;
      player.pos.x += player.vel.x * STEP * player.dir.x;
      player.pos.y += player.vel.y * STEP * player.dir.y;

      if (player.pos.x + player.sprite.width >= GAME_WIDTH) {
        player.pos.x = GAME_WIDTH - player.sprite.width;
        player.dir.x *= -1;
      } else if (player.pos.x <= 0) {
        player.pos.x = 0;
        player.dir.x *= -1;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(player.pos.x | 0, player.pos.y | 0);

    ctx.drawImage(player.sprite, 0, 0);

    ctx.setTransform(IDENTITY_MATRIX);

    last = hrt;

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
});
