export class Building {
    maxFloor!: number;
    floorInfo!: number[][];

    constructor() {
        this.maxFloor = 10;
        this.floorInfo = [
            [3],
            [2],
            [4],
            [],
            [6, 0, 0],
            [],
            [],
            [],
            [1],
            [],
            []
        ]
    }

    check(floorInfo: number[][]) {
        let floor = 0;
        for (let i of floorInfo) {
            for (let j of i) {
                if (j != floor)
                    return false;
            }
            floor++;
        }
        return true;
    }

    checkUp(floorinfo: number[][], currentFloor: number) {
        for (let i = currentFloor + 1; i < floorinfo.length; i++) {
            for (let j = 0; j < floorinfo[i].length; j++) {
                if (j != i)
                    return false;
            }
        }
        return true;
    }

    checkDown(floorInfo: number[][], currentFloor: number) {
        for (let i = currentFloor; i >= 0; i--) {
            for (let j = 0; j < floorInfo[i].length; j++) {
                if (j != i)
                    return false;
            }
        }
        return true;
    }

}