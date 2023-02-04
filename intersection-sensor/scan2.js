//var noble = require('noble');
var noble = import('noble');
var serviceUUIDs = ['bd011f227d3c0db6e44155873d44ef40']; // BLESerial2
var allowDuplicates = false;

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(serviceUUIDs, allowDuplicates);
  } else {
    noble.stopScanning();
  }
});

var n = 2 
noble.on('discover', function(peripheral) {
  console.log(peripheral.advertisement.localName);
  peripheral.on('rssiUpdate', function(rssi) {
    if (peripheral.advertisement.txPowerLevel !== undefined) {
      // var tx = peripheral.advertisement.txPowerLevel;
      var tx = -67;
      var distance = Math.pow(10.0, (tx - rssi) / (10 * n));
      console.log('tx:' + tx + ', rssi: ' + rssi + ', distance: ' + distance);
    }   
  }); 
  peripheral.on('connect', function() {
    setInterval(function() {
      peripheral.updateRssi();
    }, 1000);
  }); 
  peripheral.on('disconnect', function() {
    console.log('on -> disconnect');
  }); 
  peripheral.connect();
});