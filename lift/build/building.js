"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
class Building {
    constructor() {
        this.maxFloor = 11;
        this.floorInfo = [
            [1, 4, 3, 2],
            [1, 10, 2],
            [],
            [3, 6, 4, 5, 6],
            [],
            [],
            [0, 0, 0],
            [],
            [4],
            [6, 5, 2],
            []
        ];
    }
    checking(floorInfo) {
        for (let i = 0; i <= this.maxFloor; i++) {
            for (let j of floorInfo[i]) {
                if (j != i)
                    return false;
            }
        }
        return true;
    }
}
exports.Building = Building;
