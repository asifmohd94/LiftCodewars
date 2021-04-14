"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lift = void 0;
const building_1 = require("./building");
class Lift {
    constructor() {
        this.direction = true;
        this.maxCapacity = 10;
        this.currentFloor = 0;
        this.ans = [];
        this.lift = [];
        this.build = new building_1.Building();
        this.info = this.build.floorInfo;
        this.max = this.build.maxFloor;
    }
    isFull() {
        if (this.lift.length >= this.maxCapacity) {
            return true;
        }
        else {
            return false;
        }
    }
    checkFloorUp() {
        if (this.lift.includes(this.currentFloor)) {
            while (this.lift.includes(this.currentFloor)) {
                this.lift.splice(this.lift.indexOf(this.currentFloor), 1);
                this.info[this.currentFloor].push(this.currentFloor);
            }
            this.ans.push(this.currentFloor);
        }
        if (!this.isFull()) {
            for (let i of this.info[this.currentFloor]) {
                if (i > this.currentFloor) {
                    this.info[this.currentFloor].splice(this.info[this.currentFloor].indexOf(i), 1);
                    this.lift.push(i);
                }
            }
            this.ans.push(this.currentFloor);
        }
        if (this.direction && this.currentFloor < this.max) {
            this.currentFloor++;
            if (this.currentFloor == this.max) {
                this.direction = false;
            }
        }
    }
    checkFloorDown() {
        if (this.lift.includes(this.currentFloor)) {
            while (this.lift.includes(this.currentFloor)) {
                this.lift.splice(this.lift.indexOf(this.currentFloor), 1);
                this.info[this.currentFloor].push(this.currentFloor);
            }
            this.ans.push(this.currentFloor);
        }
        if (!this.isFull) {
            for (let i of this.info[this.currentFloor]) {
                if (i < this.currentFloor) {
                    this.info[this.currentFloor].splice(this.info[this.currentFloor].indexOf(i), 1);
                    this.lift.push(i);
                }
            }
            this.ans.push(this.currentFloor);
            this.currentFloor--;
        }
        if (!this.direction && this.currentFloor > 0) {
            this.currentFloor--;
            if (this.currentFloor == 0) {
                this.direction = true;
            }
        }
    }
}
exports.Lift = Lift;
