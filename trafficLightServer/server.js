import Fastify from 'fastify';
import { requestI2CAccess } from "node-web-i2c";
import NPIX from "@chirimen/neopixel-i2c";

const fastify = Fastify(({ logger: true }));
const npix = new NPIX(port, 0x41);

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.get('/yusena', async (request,reply) => {
    await setPattern(npix,pattern2)
    return { yusen: 'a' }
})

const start = async (npix) => {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

const init = async () => {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const neoPixels = 16;
    return await npix.init(neoPixels);
}

async function main() {
    const npix = await init();
    await setPattern(npix, pattern1)
    start();
}

main();

// 青 - -   - - 赤
// const pattern1 = [0x0000ff, 0x0000ff, , , , , , , , , , , , , 0xff0000, 0xff0000];
const pattern1 = [
    0x0000ff, 0x0000ff, 0x000000,
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0xff0000, 0xff0000];

// - 黄 -   - - 赤
//const pattern2 = [, , , 0xffff00, 0xffff00, , , , , , , , , , 0xff0000, 0xff0000];
const pattern2 = [
    0x000000, 0x000000, 0x000000,
    0xffff00, 0xffff00, 0x000000,
    0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0xff0000, 0xff0000];

// - - 赤   青 - -
const pattern3 = [
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0xff0000, 0xff0000,
    0x0000ff, 0x0000ff, 0x000000,
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000];

// - - 赤   - 黄 -
const pattern4 = [
    0x000000, 0x000000, 0x000000,
    0x000000, 0x000000, 0x000000,
    0xff0000, 0xff0000,
    0x000000, 0x000000, 0x000000,
    0xffff00, 0xffff00, 0x000000,
    0x000000, 0x000000];

async function setPattern(npix, pattern) {
    // パターン設定
    const grbArray = [];
    for (const color of pattern) {
        const r = color >> 16 & 0xff;
        const g = color >> 8 & 0xff;
        const b = color & 0xff;
        grbArray.push(g);
        grbArray.push(r);
        grbArray.push(b);
    }
    await npix.setPixels(grbArray);
}