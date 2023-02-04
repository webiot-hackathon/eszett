import { requestI2CAccess } from "node-web-i2c/index.js.js";
import GROVEACCELEROMETER from "@chirimen/grove-accelerometer";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js.js";

var channel
var ary = [0, 0, 0];


main();
//getA();

async function main() {
    var relay = RelayServer("chirimentest", "chirimenSocket", nodeWebSocketLib, "https://chirimen.org");
    channel = await relay.subscribe("chirimenTOKU");
    console.log("web socketリレーサービスに接続しました");

    await measureAcceleration();
}

async function measureAcceleration() {
    var i2cAccess = await requestI2CAccess();
    var port = i2cAccess.ports.get(1);
    var groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
    await groveaccelerometer.init();

    for (; ;) {
        try {
            var values = await groveaccelerometer.read();
            ary[0] = values.x;
            ary[1] = values.y;
            ary[2] = values.z;
            console.log(`measure:${ary}`);

            var jsonData =
            {
                "acceleration": ary,
                "MACaddress": "b8:27:eb:37:fe:3d"
            };
            channel.send(jsonData);

        } catch (err) {
            console.log("READ ERROR:" + err);
        }
        await sleep(1000);
    }
}

async function getA() {
    console.log(`get:${ary}`);
    return ary;
}
