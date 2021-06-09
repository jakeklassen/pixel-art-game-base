import { Loader } from 'resource-loader';
import bunnyUrl from 'url:./assets/bunny.png';
import visitorFontUrl from 'url:./assets/fonts/visitor/visitor1.ttf';
import mapUrl from 'url:./assets/map.png';
import megamanUrl from 'url:./assets/megaman.png';
import { getResolution } from './lib/screen';

const GAME_WIDTH = 384;
const GAME_HEIGHT = 216;

const loader = new Loader();

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
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
  .add(megamanUrl)
  .add(mapUrl)
  .add(visitorFontUrl)
  .load(async (loader, resources) => {
    const font = new FontFace('Visitor', `url(${visitorFontUrl})`);
    const visitorFont = await font.load();
    document.fonts.add(visitorFont);
    const bunnyResource = resources[bunnyUrl]!;
    const playerResource = resources[megamanUrl]!;
    const mapResource = resources[mapUrl]!;

    const player = {
      pos: {
        x: playerResource.data.width / 2,
        y: canvas.height / 2 - playerResource.data.height / 2,
      },
      dir: {
        x: 1,
        y: 1,
      },
      vel: {
        x: 60,
        y: 60,
      },
      sprite: playerResource.data as HTMLImageElement,
    };

    const TARGET_FPS = 60;
    const STEP = 1000 / TARGET_FPS;
    const dt = STEP / 1000;
    let last = performance.now();
    let deltaTimeAccumulator = 0;

    function frame(hrt: DOMHighResTimeStamp) {
      deltaTimeAccumulator += Math.min(1000, hrt - last);

      while (deltaTimeAccumulator >= STEP) {
        player.pos.x += player.vel.x * dt * player.dir.x;
        player.pos.y += player.vel.y * dt * player.dir.y;

        if (player.pos.x + player.sprite.width >= GAME_WIDTH) {
          player.pos.x = GAME_WIDTH - player.sprite.width;
          player.dir.x *= -1;
        } else if (player.pos.x <= 0) {
          player.pos.x = 0;
          player.dir.x *= -1;
        }

        if (player.pos.y + player.sprite.height >= GAME_HEIGHT) {
          player.pos.y = GAME_HEIGHT - player.sprite.height;
          player.dir.y *= -1;
        } else if (player.pos.y <= 0) {
          player.pos.y = 0;
          player.dir.y *= -1;
        }

        deltaTimeAccumulator -= STEP;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.setTransform(IDENTITY_MATRIX);

      ctx.drawImage(mapResource.data, 0, 0);

      ctx.fillStyle = 'white';
      ctx.font = '10px Visitor';

      ctx.setTransform(1, 0, 0, 1, player.pos.x, player.pos.y);

      ctx.drawImage(player.sprite, 0, 0);

      ctx.setTransform(IDENTITY_MATRIX);

      last = hrt;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
