/**
 * 車センサーから取得するデータ群
 */
export interface CarSensorListDto {
  carSensors: CarSensorDto[];
}

export interface CarSensorDto {
  /**
   * <carMacAddress, acceleration[]]>
   * Map([ [aa:aa:aa:aa, [[1,2,3],[1,2,3],[1,2,3]] ] ])
   */
  accelerationData: Map<string, number[][]>;
}

/**
 * 交差点センサーから取得するデータ群
 */
export interface IntersectionSensorListDto {
  intersectionSensors: IntersectionSensorDto[];
}

export interface IntersectionSensorDto {
  macAddress: string;
  potisionCordinate: number[];
  // <carMacAddress, rssi[]>
  rssiData: Map<string, number[]>;
}

/**
 * 座標
 */
export interface CarPositionCoorinateListDto {
  carPositionCoorinates: CarPositionCoorinate[];
}

export interface CarPositionCoorinate {
  /**
   * <carMacAddress, potisionCordinate[]]>
   * Map([ [aa:aa:aa:aa, [[1,2],[1,2],[1,2]] ] ])
   */
  potisionCordinateData: Map<string, number[][]>;
}
