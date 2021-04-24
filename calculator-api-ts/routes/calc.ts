import express, { Express, Router } from 'express';

export const router: Router = express.Router();


const operations: { id: number; operands: number[]; result: number; operationPerformed: string }[] = [
    {
        id: 1,
        operands: [2, 3, 1],
        result: 0,
        operationPerformed: ""

    },
    {
        id: 2,
        operands: [1, 2, 6],
        result: 0,
        operationPerformed: ""
    }
]

const history: object[] = [];

router.get('/add', (req, res) => {
    for (let x = 0; x < operations.length; x++) {
        let arr = operations[x].operands;
        let sum = arr[0];
        for (let i = 1; i < arr.length; i++) {
            sum += arr[i];
        }
        operations[x].result = sum;
        operations[x].operationPerformed = "+"
    }
    res.send(operations);
})

router.get('/add/:id', (req, res) => {
    let paramId = parseInt(req.params.id);
    let ans = operations.find(x => x.id === paramId);
    if (!ans) {
        res.status(404).send("Invalid Id");
    }
    let op = operations[paramId - 1];
    let sum = 0;
    for (let x of op.operands) {
        sum += x;
    }
    op.result = sum;
    op.operationPerformed = "+";
    history.push(op);
    res.send(op);

});

router.get('/subtract', (req, res) => {
    for (let x = 0; x < operations.length; x++) {
        let arr = operations[x].operands;
        let minus = arr[0];
        for (let i = 1; i < arr.length; i++) {
            minus -= arr[i];
        }
        operations[x].result = minus;
        operations[x].operationPerformed = "-";
    }
    res.send(operations);
})

router.get('/subtract/:id', (req, res) => {
    let paramId = parseInt(req.params.id);
    let ans = operations.find(x => x.id === paramId);
    if (!ans) {
        res.status(404).send("Invalid Id");
    }
    let op = operations[paramId - 1];
    let minus = op.operands[0];
    for (let x = 1; x < op.operands.length; x++) {
        minus -= op.operands[x];
    }
    op.result = minus;
    op.operationPerformed = "-"
    history.push(op);
    res.send(op);
});

router.get('/multiply', (req, res) => {
    for (let x = 0; x < operations.length; x++) {
        let arr = operations[x].operands;
        let product = 1;
        for (let i of arr) {
            product *= i;
        }
        operations[x].result = product;
        operations[x].operationPerformed = "*";
    }
    res.send(operations);
})

router.get('/multiply/:id', (req, res) => {
    let paramId = parseInt(req.params.id);
    let ans = operations.find(x => x.id === paramId);
    if (!ans) {
        res.status(404).send("Invalid Id");
    }
    let op = operations[paramId - 1];
    let product = op.operands[0];
    for (let x = 1; x < op.operands.length; x++) {
        product *= op.operands[x];;
    }
    op.result = product;
    op.operationPerformed = "*"
    history.push(op);
    res.send(op);
});

router.get('/divide', (req, res) => {
    for (let x = 0; x < operations.length; x++) {
        let arr = operations[x].operands;
        let divide = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] == 0) {
                console.log("Error cant divide by 0");
                return;
            }
            divide = divide / arr[i];
        }
        operations[x].result = divide;
        operations[x].operationPerformed = "/";
    }
    res.send(operations);
})

router.get('/divide/:id', (req, res) => {
    let paramId = parseInt(req.params.id);
    let ans = operations.find(x => x.id === paramId);
    if (!ans) {
        res.status(404).send("Invalid Id");
    }
    let op = operations[paramId - 1];
    let divide = op.operands[0];
    for (let x = 1; x < op.operands.length; x++) {
        divide /= op.operands[x];;
    }
    op.result = divide;
    op.operationPerformed = "/"
    history.push(op);
    res.send(op);
});

router.get('/mod', (req, res) => {
    for (let x = 0; x < operations.length; x++) {
        let arr = operations[x].operands;
        let modulus = arr[0];
        for (let i = 1; i < arr.length; i++) {
            modulus %= arr[i];
        }
        operations[x].result = modulus;
        operations[x].operationPerformed = "%"
    }
    res.send(operations);

})

router.get('/mod/:id', (req, res) => {
    let paramId = parseInt(req.params.id);
    let ans = operations.find(x => x.id === paramId);
    if (!ans) {
        res.status(404).send("Invalid Id");
    }
    let op = operations[paramId - 1];
    let modulus = op.operands[0];
    for (let x = 1; x < op.operands.length; x++) {
        modulus %= op.operands[x];;
    }
    op.result = modulus;
    op.operationPerformed = "%"
    history.push(op);
    res.send(op);
});

router.get('/history', (req, res) => {
    res.send(history);
});

router.get('/history/last', (req, res) => {
    let last = history.length - 1;
    res.send(history[last]);
});

router.get('/history/:id', (req, res) => {
    let last = parseInt(req.params.id);
    if (last > history.length) {
        return res.status(404).send("Invalid reques!! History not present");
    }
    res.send(history[last - 1]);
});

router.post('/', (req, res) => {
    const operation = {
        id: req.body.id,
        operands: req.body.operands,
        result: 0,
        operationPerformed: ""
    }
    operations.push(operation);
    res.send(operation);
})