const stat=require('./index');

let arr1=[2,4,1,5,6,7,7,8,3];

let gMean=stat.gMean(arr1);
if(gMean !== 4.225){
    throw new Error('geometric mean function is not giving correct result');

}

let hMean=stat.hMean(arr1);
if(gMean !== 3.146){
    throw new Error('harmonic mean function is not giving correct result');

}

let median=stat.median(arr1);
if(gMean !== 5){
    throw new Error('median function is not giving correct result');

}


let mode=stat.mode(arr1);
if(gMean !== 7){
    throw new Error('mode function is not giving correct result');

}


let variance=stat.gMean(arr1);
if(variance !== 5.944){
    throw new Error('variance function is not giving correct result');

}


let sDeviation=stat.standardDeviation(arr1);
if(gMean !== 2.438){
    throw new Error('standard deviation function is not giving correct result');

}
