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

loader
  .add(bunnyUrl)
  .add(visitorFontUrl)
  .load(async (loader, resources) => {
    const font = new FontFace('Visitor', `url(${visitorFontUrl})`);
    const visitorFont = await font.load();
    document.fonts.add(visitorFont);
    const bunnyResource = resources[bunnyUrl];

    if (bunnyResource == null) {
      throw new Error(`Could not load ${bunnyUrl}`);
    }

    const bunny = {
      pos: {
        x: bunnyResource.data.width / 2,
        y: Math.round(canvas.height / 2 - bunnyResource.data.height / 2),
      },
      dir: {
        x: 1,
        y: 1,
      },
      vel: {
        x: 60,
        y: 60,
      },
      sprite: bunnyResource.data as HTMLImageElement,
    };

    const TARGET_FPS = 60;
    const STEP = 1000 / TARGET_FPS;
    let last = performance.now();
    let dt = 0;

    function frame(hrt: DOMHighResTimeStamp) {
      dt += Math.min(1000, hrt - last);

      while (dt >= STEP) {
        const delta = STEP / 1000;

        bunny.pos.x += bunny.vel.x * delta * bunny.dir.x;
        bunny.pos.y += bunny.vel.y * delta * bunny.dir.y;

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

        dt -= STEP;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '10px Visitor';

      ctx.setTransform(1, 0, 0, 1, bunny.pos.x, bunny.pos.y);

      ctx.drawImage(bunny.sprite, 0, 0);

      ctx.setTransform(IDENTITY_MATRIX);

      last = hrt;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
