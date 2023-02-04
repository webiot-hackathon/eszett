import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import NPIX from "@chirimen/neopixel-i2c";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const neoPixels = 16; // LED個数

main();

async function main() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const npix = new NPIX(port, 0x41);
    await npix.init(neoPixels);

    await nPixTest2(npix);

}


//青：0x0000ff
//黄：0xffff00
//赤：0xff0000

// 全て青
const pattern0 = [0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff];

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

async function nPixTest2(npix) {
    // パターンを変化させる
    await setPattern(npix, pattern0);
    await sleep(1000);
    for (; ;) {
        await setPattern(npix, pattern1);
        await sleep(6000);
        await setPattern(npix, pattern2);
        await sleep(2500);
        await setPattern(npix, pattern3);
        await sleep(6000);
        await setPattern(npix, pattern4);
        await sleep(2500);
    }
}


