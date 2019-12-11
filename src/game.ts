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
    vel: {
      x: 20,
      y: 0,
    },
    sprite: bunnyResource.data as HTMLImageElement,
  };

  MainLoop.setUpdate((dt: number) => {
    dt = dt / 1000;

    bunny.pos.x += bunny.vel.x * dt;
    bunny.pos.y += bunny.vel.y * dt;
  })
    .setDraw((interpolation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bunny.sprite, bunny.pos.x, bunny.pos.y);
    })
    .start();
});
