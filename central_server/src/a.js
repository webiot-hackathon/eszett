import { createBluetooth } from 'node-ble';
import sleep from 'sleep-promise';

import getMAC, { isMAC } from 'getmac'


// 

import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
// const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var gpioPort0;

// async function connect(){
// 	// GPIOポート0の初期化
// 	// var gpioAccess = await requestGPIOAccess();
// 	// var mbGpioPorts = gpioAccess.ports;
// 	// gpioPort0 = mbGpioPorts.get(26);
// 	// await gpioPort0.export("out"); //port0 out
	
// 	// webSocketリレーの初期化
// 	var relay = RelayServer("chirimenToku", "eszett" , nodeWebSocketLib, "https://chirimen.org");
// 	channel = await relay.subscribe("intersection1");
// 	console.log("web socketリレーサービスに接続しました");
// 	// channel.onmessage = controlLED;
// }

//


const main = async () => {
//   await connect();
  const { bluetooth, destroy } = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();
  if (! await adapter.isDiscovering()) {
    console.log('Discovering:');
    await adapter.startDiscovery();
    while (true) {
      const devices = await adapter.devices();
      let carData = [];
      for(let i=0; i<devices.length; i++){
        console.log(devices[i]);
        const device = await adapter.getDevice(devices[i]);
        const rssi = await device.getRSSI();
        console.log(rssi)
        carData.push({
            'carMacAddress':String(devices[i]),
            'rssi':String(rssi),
        })  
      }
        var jsonData = 
        {
            'macAddress': getMAC(),
            'carData':carData,
        };
        console.log(jsonData);
        // channel.send(jsonData);

      await sleep(3000);
    }
  }
};

main();