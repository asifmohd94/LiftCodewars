export const hMean=(arr:number[]):number=>{
    let sum = 0;
    for (let i of arr) {
        sum += (1 / i)
    }
    let result = arr.length / sum;
    return parseInt(result.toFixed(3));
}

export const gMean=(arr:number[]):number=>{
    let product = 1;
    for (let i of arr) {
        product *= (1 + i);
    }
    let pow = (1 / arr.length);
    let result = Math.pow(product, pow) - 1;
    return parseInt(result.toFixed(3));
}


export const median=(arr:number[])=>{
    let med;
    let index;

    arr.sort();
    if (arr.length % 2 != 0) {
        index = Math.floor(arr.length / 2);
        med = arr[index];
    } else {
        index = arr.length / 2;
        med = arr[index - 1] + arr[index] / 2;
    }
    return med;
}

export const mode=(arr:number[])=>{
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
}


export const mean=(arr:number[])=>{
    let sum=0;
    for(let i of arr){
        sum+=i;
    }
    return (sum/arr.length);
    }


export const variance=(arr:number[]):number=>{
    let ans = 0;
    for (let i of arr) {
        ans = Math.pow((i - mean(arr)), 2) + ans;
    }
    let varnc = ans / (arr.length - 1);
    return parseInt (varnc.toFixed(3));
}

export const standardDeviation=(arr:number[])=>{
return Math.sqrt(variance(arr));
}


export const corelation=(arr:number[][]):number=>{
    let mean1 = mean(arr[0]);
    let mean2 = mean(arr[1]);
    let sumX = 0;
    let sumY = 0;
    for (let j = 0; j < arr[0].length; j++) {
        sumX += (arr[0][j] - mean1);
        sumY += (arr[1][j] - mean2);
    }

    let result = (sumX * sumY) / (Math.sqrt(Math.pow(sumX, 2) * Math.pow(sumY, 2)));

    return result;
}


export const linearRegression=(arr:number[][]):string=>{
    let productSum = 0;
    let sqrXSum = 0;
    let sqrYSum = 0;
    let sumX = 0;
    let sumY = 0;
    let n = arr[0].length
    for (let i = 0; i < n; i++) {
        productSum += (arr[0][i] * arr[1][i]);
        sqrXSum += Math.pow(arr[0][i], 2);
        sqrYSum += Math.pow(arr[1][i], 2);
        sumX += arr[0][i];
        sumY += arr[1][i];
    }
    let a = ((sumY * sqrXSum) - ((sumX * productSum)) / (n * sqrXSum) - sqrXSum)

    let b = ((n * productSum) - (sumX * sumY)) / ((n * sqrXSum) - sqrXSum);

    let y = a.toFixed(3) + " + " + b.toFixed(3) + " x";
    return y;
}