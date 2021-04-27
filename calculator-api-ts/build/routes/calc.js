"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const history = [];
exports.router.post('/add', (req, res) => {
    const operation = {
        operands: req.body.operand,
        result: 0,
        operationPerformed: ""
    };
    let sum = 0;
    for (let i of operation.operands) {
        sum += i;
    }
    operation.result = sum;
    operation.operationPerformed = "+";
    history.push(operation);
    res.send(operation);
});
exports.router.post('/subtract', (req, res) => {
    console.log("hello I m running");
    const operation = {
        operands: req.body.operand,
        result: 0,
        operationPerformed: ""
    };
    let minus = operation.operands[0];
    for (let i = 1; i < operation.operands.length; i++) {
        minus -= operation.operands[i];
    }
    operation.result = minus;
    operation.operationPerformed = "-";
    history.push(operation);
    res.send(operation);
});
exports.router.post('/multiply', (req, res) => {
    const operation = {
        operands: req.body.operand,
        result: 0,
        operationPerformed: ""
    };
    let product = 1;
    for (let i of operation.operands) {
        product *= i;
    }
    operation.result = product;
    operation.operationPerformed = "*";
    history.push(operation);
    res.send(operation);
});
exports.router.post('/divide', (req, res) => {
    const operation = {
        operands: req.body.operand,
        result: 0,
        operationPerformed: ""
    };
    let divide = operation.operands[0];
    for (let i = 1; i < operation.operands.length; i++) {
        divide /= operation.operands[i];
    }
    operation.result = divide;
    operation.operationPerformed = "/";
    history.push(operation);
    res.send(operation);
});
exports.router.post('/modulus', (req, res) => {
    const operation = {
        operands: req.body.operand,
        result: 0,
        operationPerformed: ""
    };
    let mod = operation.operands[0];
    for (let i = 1; i < operation.operands.length; i++) {
        mod %= operation.operands[i];
    }
    operation.result = mod;
    operation.operationPerformed = "%";
    history.push(operation);
    res.send(operation);
});
exports.router.get('/history', (req, res) => {
    res.send(history);
});
exports.router.get('/history/last', (req, res) => {
    let last = history.length - 1;
    res.send(history[last]);
});
exports.router.get('/history/:id', (req, res) => {
    let last = parseInt(req.params.id);
    if (last > history.length) {
        return res.status(404).send("Invalid reques!! History not present");
    }
    res.send(history[last - 1]);
});
