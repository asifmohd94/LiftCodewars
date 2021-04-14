import { Building } from './building'

export class Lift {
    direction: boolean = true;
    maxCapacity: number = 10;
    currentFloor: number = 0;
    ans: number[] = [];
    lift: number[] = [];    
    build = new Building();
    info = this.build.floorInfo;
    max = this.build.maxFloor;

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
                    this.info[this.currentFloor].splice(this.info[this.currentFloor].indexOf(i),1);
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
                    this.info[this.currentFloor].splice(this.info[this.currentFloor].indexOf(i),1);
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