"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_1 = require("./building");
const lift_1 = require("./lift");
let tower = new building_1.Building();
let elevator = new lift_1.Lift();
while (tower.check(tower.floorInfo) != true || elevator.lift.length != 0) {
    console.log("current floor", elevator.currentFloor);
    console.log(tower.floorInfo);
    if (elevator.stop(elevator.currentFloor, elevator.lift, tower.floorInfo[elevator.currentFloor], elevator.direction) == true) {
        elevator.ans.push(elevator.currentFloor);
        elevator.removePassenger(elevator.currentFloor);
        for (let target of elevator.temp) {
            tower.floorInfo[elevator.currentFloor].push(target);
        }
        elevator.temp = [];
        for (let target of tower.floorInfo[elevator.currentFloor])
            elevator.addPassenger(elevator.currentFloor, target);
        tower.floorInfo[elevator.currentFloor] = elevator.temp;
        elevator.temp = [];
    }
    if (elevator.direction && elevator.currentFloor != tower.maxFloor && elevator.lift.length == 0 && tower.checkUp(tower.floorInfo, elevator.currentFloor)) {
        elevator.direction = false;
    }
    else if (!elevator.direction && elevator.currentFloor != 0 && elevator.lift.length == 0 && tower.checkDown(tower.floorInfo, elevator.currentFloor)) {
        elevator.direction = true;
    }
    else if (elevator.direction && elevator.currentFloor <= tower.maxFloor) {
        elevator.moveUp();
    }
    else {
        elevator.moveDown();
    }
}
console.log("final ans", elevator.ans);
