export { detectYuzuri, decideYuzuri }

const roadASanctualiA: number[][] = [[1, 2], [3, 4]];
const roadASanctualiB: number[][] = [[1, 2], [3, 4]];
const roadBSanctualiA: number[][] = [[1, 2], [3, 4]];
const roadBSanctualiB: number[][] = [[1, 2], [3, 4]];

function detectYuzuri(carPositionA: number[][], carPositionB: number[][], carAccA: number[], carAccB: number[]): boolean {
    if (carAccA[0] < 1) {
        if (inSquareOrNot(carPositionA[-1]) && inSquareOrNot(carPositionB[-1])) {
            return true
        }
    }
    return false
}

function decideYuzuri(carPositionA: number[][], carPositionB: number[][]): string | undefined {
    if (!inSquareOrNot(carPositionA[-1])) {
        return "b"
    } else if (!inSquareOrNot(carPositionB[-1])) {
        return "a"
    }
    return undefined
}

function inSquareOrNot(carPosition: number[]): boolean {
    return true
}