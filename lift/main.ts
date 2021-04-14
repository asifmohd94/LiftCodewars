import {Lift} from './lift';
import {Building} from './building';

let build=new Building();
let lift=new Lift();

let getAns=()=>{
while(!build.checking(lift.info)){
    if(lift.direction){
        lift.checkFloorUp()
    }else{
        lift.checkFloorDown()
    }
    return lift.ans
}
}
console.log(getAns());
