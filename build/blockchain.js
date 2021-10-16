"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChain = void 0;
var block_1 = require("./block");
var transaction_1 = require("./transaction");
var utilities_1 = require("./utilities");
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.blocks = [];
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.createInitialBlock();
        console.log('Blockchain created.');
    }
    BlockChain.prototype.createInitialBlock = function () {
        this.blocks.push(new block_1.Block([new transaction_1.Transaction(null, "to", 0, null)], (0, utilities_1.hashFn)("-")));
    };
    BlockChain.prototype.getLastBlock = function () {
        return this.blocks[this.blocks.length - 1];
    };
    BlockChain.prototype.mine = function (rewardAdress) {
        var block = new block_1.Block(this.pendingTransactions, this.getLastBlock().getHash());
        console.log("Block mined!");
        this.blocks.push(block);
        this.pendingTransactions = [new transaction_1.Transaction(null, rewardAdress, this.miningReward, null)];
    };
    BlockChain.prototype.addTransaction = function (transaction) {
        if (!transaction.from || !transaction.to)
            throw new Error('No address. Nope.');
        if (!transaction.isValid())
            throw new Error("Transaction is not valid.");
        this.pendingTransactions.push(transaction);
    };
    BlockChain.prototype.getBalanceOfAdress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.getTransactions(); _b < _c.length; _b++) {
                var trans = _c[_b];
                if (trans.from === address)
                    balance -= trans.amount;
                if (trans.to === address)
                    balance += trans.amount;
            }
        }
        return balance;
    };
    BlockChain.prototype.isChainValid = function () {
        console.log("Validation: ");
        for (var i = 1; i < this.blocks.length; i++) {
            var current = this.blocks[i];
            var prev = this.blocks[i - 1];
            if (!current.hasValidTr())
                return false;
            if (current.getHash() !== current.calculateHash())
                return false;
            if (current.getPrevHash() !== prev.getHash())
                return false;
        }
        return true;
    };
    return BlockChain;
}());
exports.BlockChain = BlockChain;
