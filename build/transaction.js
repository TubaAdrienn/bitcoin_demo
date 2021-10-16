"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var utilities_1 = require("./utilities");
var forge = __importStar(require("node-forge"));
var Transaction = /** @class */ (function () {
    function Transaction(from, to, amount, sign) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.sign = sign;
        this.ts = new Date().getTime();
        this.ed25519 = forge.pki.ed25519;
        this.hash = (0, utilities_1.hashFn)(from + to + amount + this.ts + this.sign);
    }
    Transaction.prototype.isValid = function () {
        if (this.from == null)
            return true;
        if (!this.sign || this.sign.length == 0)
            throw new Error('No signature.');
        var isOk = this.ed25519.verify({
            message: this.to,
            encoding: 'utf8',
            signature: (0, utilities_1.convertToBytes)(this.sign),
            publicKey: (0, utilities_1.convertToBytes)(this.from)
        });
        console.log("Valid transaction.");
        return isOk;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
