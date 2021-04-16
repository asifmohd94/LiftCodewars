import { Building } from './building';

export class Lift {
    maxCapacity!: number;
    lift!: number[];
    direction!: boolean;
    currentFloor: number;
    building: Building;
    arr!: number[];
    ans!: number[];
    temp!: number[];
    constructor() {
        this.maxCapacity = 20;
        this.currentFloor = 0;
        this.building = new Building();
        this.direction = true;
        this.ans = [];
        this.arr = [];
        this.lift = [];
        this.temp = [];
    }

    isFull() {
        if (this.lift.length >= this.maxCapacity) {
            return true;
        }
        return false;
    }

    addPassenger(currentFloor: number, target: number) {
        if (!this.isFull()) {
            if (this.direction && target > currentFloor) {
                this.lift.push(target);
            }
            else if (this.direction != true && target < currentFloor) {
                this.lift.push(target);
            }
            else {

                this.temp.push(target);
            }
        }
        else {
            this.temp.push(target);
        }
    }


    removePassenger(currentFloor: number) {
        let currLift = []
        for (let temp of this.lift) {
            if (temp != currentFloor) {
                currLift.push(temp);
            }
            else {
                this.temp.push(temp);
            }
        }
        this.lift = currLift;
    }

    moveUp() {
        if (this.direction && this.currentFloor < this.building.maxFloor) {
            this.currentFloor++;
        }
        else {
            this.direction = false;
        }
    }

    moveDown() {
        if (this.direction == false && this.currentFloor > 0) {
            this.currentFloor--;
        }
        else {
            this.direction = true;
        }
    }


    stop(currentFloor: number, lift: number[], currFloorInfo: number[], direction: boolean) {
        if (lift.indexOf(currentFloor) >= 0) {
            return true;
        }
        for (let x of currFloorInfo) {
            if (x > currentFloor && direction) {
                return true;
            }
            else if (x < currentFloor && !direction) {
                return true;
            }
        }
        return false
    }

}