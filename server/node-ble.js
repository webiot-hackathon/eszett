import { createBluetooth } from 'node-ble';
import sleep from 'sleep-promise';

import getMAC, { isMAC } from 'getmac'

const main = async () => {
  const { bluetooth, destroy } = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();
  if (! await adapter.isDiscovering()) {
    console.log('Discovering:');
    await adapter.startDiscovery();
    while (true) {
      const devices = await adapter.devices();
      for (var uuid of devices){
        // console.log(uuid);
        const device = await adapter.getDevice(uuid);
        const rssi = await device.getRSSI();
        // console.log(rssi)
        var rssi_string = String(rssi);
        var device_string = String(uuid);


        var jsonData = 
        {
            //intersectionSensors: [
            //     {
            'macAddress': getMAC(),
                    // blueToothData: [
                    //    {
            'carMacAddress': device_string,
            'rssi': rssi_string
                    //     },
                    // ],
                 //},
            //],
        };


        // console.log(jsonData);
        channel.send(jsonData);

      }

      await sleep(3000);
    }
  }
};

main();
