"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lift_1 = require("./lift");
const building_1 = require("./building");
let build = new building_1.Building();
let lift = new lift_1.Lift();
let getAns = () => {
    while (!build.checking(lift.info)) {
        if (lift.direction) {
            lift.checkFloorUp();
        }
        else {
            lift.checkFloorDown();
        }
        return lift.ans;
    }
};
console.log(getAns());
