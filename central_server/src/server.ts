import {
  CarPositionCoorinateListDto,
  CarSensorListDto,
  IntersectionSensorDto,
  IntersectionSensorListDto,
} from "./repository";
import { WebSocket } from "./websocket";

//mock
const mockCarSensors: CarSensorListDto = {
  carSensors: [
    {
      accelerationData: new Map([
        [
          "car:aa:aa",
          [
            [1, 2, 3],
            [2, 3, 4],
            [4, 5, 6],
          ],
        ],
        [
          "car:aa:aa",
          [
            [2, 3, 4],
            [3, 5, 6],
            [1, 4, 6],
          ],
        ],
      ]),
    },
  ],
};

const mockCarIntersectionSensors: IntersectionSensorListDto = {
  intersectionSensors: [
    {
      macAddress: "is:aa:aa:aa",
      potisionCordinate: [0, 0],
      rssiData: new Map([
        ["car:aa:aa", [-4, -5, -6, -9]],
        ["car:bb:bb", [-5, -5, -6, -7]],
      ]),
    },
    {
      macAddress: "is:bb:bb:bb",
      potisionCordinate: [5, 0],
      rssiData: new Map([
        ["car:aa:aa", [-4, -5, -6, -9]],
        ["car:bb:bb", [-5, -5, -6, -7]],
      ]),
    },
    {
      macAddress: "is:cc:cc:cc",
      potisionCordinate: [0, 5],
      rssiData: new Map([
        ["car:aa:aa", [-4, -5, -6, -9]],
        ["car:bb:bb", [-5, -5, -6, -7]],
      ]),
    },
  ],
};

//global変数
/**
 * intersectionSensorsの初期値を設定する
 */
export const globalState: {
  carSensors: CarSensorListDto;
  intersectionSensors: IntersectionSensorListDto;
  carPositionCoorinates: CarPositionCoorinateListDto;
} = {
  carSensors: { carSensors: [] },
  intersectionSensors: {
    intersectionSensors: [
      {
        macAddress: "b8:27:eb:40:ae:df",
        potisionCordinate: [0, 0],
        rssiData: new Map([]),
      },
      {
        macAddress: "",
        potisionCordinate: [0, 150],
        rssiData: new Map([]),
      },
      {
        macAddress: "",
        potisionCordinate: [150, 0],
        rssiData: new Map([]),
      },
    ],
  },
  carPositionCoorinates: { carPositionCoorinates: [] },
};

function main(): void {
  //websocketから値を取得
  const webSocketInstance = new WebSocket();
  webSocketInstance.websocketGet();
  //websocketから取得した値から車の座標を出力
  globalState.intersectionSensors.intersectionSensors.forEach((v) => {
    calcPotisionCordinate(v.macAddress);
  });
}

//座標取得
function calcPotisionCordinate(carAddress: string): void {
  /**
   * 交差点センサの座標を変数に格納
   */
  const intersection = globalState.intersectionSensors.intersectionSensors;
  const p1 = intersection[0].potisionCordinate; //(0,0)
  const p2 = intersection[1].potisionCordinate; //(0,5)
  const p3 = intersection[2].potisionCordinate; //(5,0)
  /**
   * 車のx, y座標
   */
  let x: number;
  let y: number;

  /**
   * rssiの値
   */
  let r1 =
    intersection[0].rssiData.get(carAddress)[
      intersection[0].rssiData.get(carAddress).length - 1
    ];
  let r2 =
    intersection[1].rssiData.get(carAddress)[
      intersection[1].rssiData.get(carAddress).length - 1
    ];
  let r3 =
    intersection[2].rssiData.get(carAddress)[
      intersection[2].rssiData.get(carAddress).length - 1
    ];

  // (x - p1[0]) ** 2 + (y - p1[1]) ** 2 = r1 ** 2;
  // (x - p2[0]) ** 2 + (y - p2[1]) ** 2 = r2 ** 2;
  // (x - p3[0]) ** 2 + (y - p3[1]) ** 2 = r3 ** 2;

  let x1 =
    p3[0] + Math.sqrt(r3 ** 2 - ((r1 ** 2 - r2 ** 2 - p2[1] ** 2) / 2) * p2[1]);

  if (x1 > 0 && !isNaN(x1)) {
    let y1 = -1 * x ** 2 - r1;
    if (y1 > 0 && !isNaN(x1)) {
      y = y1;
    } else {
      y = -1 * x ** 2 + r1;
    }
  } else {
    x =
      p3[0] -
      Math.sqrt(r3 ** 2 - ((r1 ** 2 - r2 ** 2 - p2[1] ** 2) / 2) * p2[1]);
    let y1 = -1 * x ** 2 - r1;
    if (y1 > 0 && !isNaN(x1)) {
      y = y1;
    } else {
      y = -1 * x ** 2 + r1;
    }
  }

  const globalCarPositionProity =
    globalState.carPositionCoorinates.carPositionCoorinates;
  globalCarPositionProity.forEach((v) => {
    v.potisionCordinateData.set(carAddress, [[x, y]]);
  });
}

for (;;) {
  main();
}
