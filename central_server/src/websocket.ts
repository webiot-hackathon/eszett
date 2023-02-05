import nodeWebSocketLib from "websocket";
import { RelayServer } from "./RelayServer.js";
import { globalState } from "./server.js";

export class WebSocket {
  public async websocketGet(): Promise<void> {
    // まずRelayServierオブジェクトを作成
    let relay = RelayServer(
      "chirimentest",
      "eszett",
      nodeWebSocketLib,
      "https://chirimen.org"
    );

    // チャンネルをサブスクライブする(Promiseなので await注意)
    let carChannel1 = await relay.subscribe("car1");
    let carChannel2 = await relay.subscribe("car2");
    let intersectionChannel1 = await relay.subscribe("intersection1");
    let intersectionChannel2 = await relay.subscribe("intersection2");
    let intersectionChannel3 = await relay.subscribe("intersection3");

    // メッセージを受信したときに起動する関数を登録
    carChannel1.onmessage = this.getCarSensorDate;
    carChannel2.onmessage = this.getCarSensorDate;
    intersectionChannel1.onmessage = this.getIntersectionSensorData;
    intersectionChannel2.onmessage = this.getIntersectionSensorData;
    intersectionChannel3.onmessage = this.getIntersectionSensorData;
  }

  //carSensorからの値取得処理
  private async getCarSensorDate(carObject: {
    MACaddress: string;
    acceleration: number[];
  }) {
    const globalCarSensorsProity = globalState.carSensors.carSensors;
    globalCarSensorsProity.forEach((v) => {
      //同じMacアドレスがある場合push
      //ない場合はset
      if (v.accelerationData.has(carObject.MACaddress)) {
        v.accelerationData
          .get(carObject.MACaddress)
          .push(carObject.acceleration);
      } else {
        v.accelerationData.set(carObject.MACaddress, [carObject.acceleration]);
      }
    });
  }

  private async getIntersectionSensorData(intersectionObject: {
    macAddress: string;
    carData: [
      {
        carMacAddress: string;
        rssi: number;
      }
    ];
  }) {
    const globalIntersectionSensorsProity =
      globalState.intersectionSensors.intersectionSensors;
    globalIntersectionSensorsProity.forEach((v) => {
      if (v.macAddress === intersectionObject.macAddress) {
        //同じMacアドレスがある場合push
        //ない場合はset
        intersectionObject.carData.forEach((v2) => {
          if (v.rssiData.has(v2.carMacAddress)) {
            v.rssiData.get(v2.carMacAddress).push(v2.rssi);
          } else {
            v.rssiData.set(v2.carMacAddress, [v2.rssi]);
          }
        });
      }
    });
  }
}
