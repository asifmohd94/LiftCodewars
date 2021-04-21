"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearRegression = exports.corelation = exports.standardDeviation = exports.variance = exports.mean = exports.mode = exports.median = exports.gMean = exports.hMean = void 0;
const hMean = (arr) => {
    let sum = 0;
    for (let i of arr) {
        sum += (1 / i);
    }
    let result = arr.length / sum;
    return parseInt(result.toFixed(3));
};
exports.hMean = hMean;
const gMean = (arr) => {
    let product = 1;
    for (let i of arr) {
        product *= (1 + i);
    }
    let pow = (1 / arr.length);
    let result = Math.pow(product, pow) - 1;
    return parseInt(result.toFixed(3));
};
exports.gMean = gMean;
const median = (arr) => {
    let med;
    let index;
    arr.sort();
    if (arr.length % 2 != 0) {
        index = Math.floor(arr.length / 2);
        med = arr[index];
    }
    else {
        index = arr.length / 2;
        med = arr[index - 1] + arr[index] / 2;
    }
    return med;
};
exports.median = median;
const mode = (arr) => {
    let count;
    let largestCount = 0;
    let result;
    for (let i = 0; i < arr.length - 1; i++) {
        count = 1;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                count++;
            }
        }
        if (count > largestCount) {
            largestCount = count;
            result = arr[i];
        }
    }
    return result;
};
exports.mode = mode;
const mean = (arr) => {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return (sum / arr.length);
};
exports.mean = mean;
const variance = (arr) => {
    let ans = 0;
    for (let i of arr) {
        ans = Math.pow((i - exports.mean(arr)), 2) + ans;
    }
    let varnc = ans / (arr.length - 1);
    return parseInt(varnc.toFixed(3));
};
exports.variance = variance;
const standardDeviation = (arr) => {
    return Math.sqrt(exports.variance(arr));
};
exports.standardDeviation = standardDeviation;
const corelation = (arr) => {
    let mean1 = exports.mean(arr[0]);
    let mean2 = exports.mean(arr[1]);
    let sumX = 0;
    let sumY = 0;
    for (let j = 0; j < arr[0].length; j++) {
        sumX += (arr[0][j] - mean1);
        sumY += (arr[1][j] - mean2);
    }
    let result = (sumX * sumY) / (Math.sqrt(Math.pow(sumX, 2) * Math.pow(sumY, 2)));
    return result;
};
exports.corelation = corelation;
const linearRegression = (arr) => {
    let productSum = 0;
    let sqrXSum = 0;
    let sqrYSum = 0;
    let sumX = 0;
    let sumY = 0;
    let n = arr[0].length;
    for (let i = 0; i < n; i++) {
        productSum += (arr[0][i] * arr[1][i]);
        sqrXSum += Math.pow(arr[0][i], 2);
        sqrYSum += Math.pow(arr[1][i], 2);
        sumX += arr[0][i];
        sumY += arr[1][i];
    }
    let a = ((sumY * sqrXSum) - ((sumX * productSum)) / (n * sqrXSum) - sqrXSum);
    let b = ((n * productSum) - (sumX * sumY)) / ((n * sqrXSum) - sqrXSum);
    let y = a.toFixed(3) + " + " + b.toFixed(3) + " x";
    return y;
};
exports.linearRegression = linearRegression;
