import Fastify from 'fastify';
import { requestI2CAccess } from "node-web-i2c";
import NPIX from "@chirimen/neopixel-i2c";

const fastify = Fastify(({ logger: true }));

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.get('/yusena', async (request,reply) => {
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
    const npix = new NPIX(port, 0x41);
    const neoPixels = 16;
    return await npix.init(neoPixels);
}

async function main() {
    const npix = await init();
    start();
}

main();