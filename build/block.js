"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var merkletreejs_1 = __importDefault(require("merkletreejs"));
var utilities_1 = require("./utilities");
var Block = /** @class */ (function () {
    function Block(trs, prevH) {
        this.trs = trs;
        this.prevH = prevH;
        this.tree = new merkletreejs_1.default(trs.map(function (t) { return t.hash; }), utilities_1.hashFn, { isBitcoinTree: true });
        this.ts = new Date().getTime();
        this.powPowPow(this.tree.getHexRoot());
    }
    Block.prototype.getTransactions = function () {
        return this.trs;
    };
    Block.prototype.getHash = function () {
        return this.hash;
    };
    Block.prototype.getPrevHash = function () {
        return this.prevH;
    };
    Block.prototype.calculateHash = function () {
        return (0, utilities_1.hashFn)(this.prevH + this.nonce.toString() + this.tree.getHexRoot());
    };
    Block.prototype.powPowPow = function (root) {
        var nonce = -1;
        var hash = '';
        var notFound = true;
        while (notFound) {
            nonce++;
            hash = (0, utilities_1.hashFn)(this.prevH + nonce.toString() + root);
            if (this.isCorrectHash(hash))
                notFound = false;
        }
        this.nonce = nonce;
        this.hash = hash;
    };
    Block.prototype.isCorrectHash = function (hash) {
        return hash.startsWith('0000');
    };
    Block.prototype.hasValidTr = function () {
        for (var _i = 0, _a = this.trs; _i < _a.length; _i++) {
            var tx = _a[_i];
            if (!tx.isValid())
                return false;
        }
        console.log("Has valid transactions.");
        return true;
    };
    return Block;
}());
exports.Block = Block;
