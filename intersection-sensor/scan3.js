
'use strict';

const noble = require('@abandonware/noble');
const knownDevices = [];

//discovered BLE device
const discovered = (peripheral) => {
    const device = {
        name: peripheral.advertisement.localName,
        uuid: peripheral.uuid,
        rssi: peripheral.rssi
    };
    knownDevices.push(device);
    console.log(`${knownDevices.length}:${device.name}(${device.uuid}) RSSI${device.rssi}`);
}

//BLE scan start
const scanStart = () => {
    noble.startScanning();
    noble.on('discover', discovered);
}

if(noble.state === 'poweredOn'){
    scanStart();
}else{
    noble.on('stateChange', scanStart);
}