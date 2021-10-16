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
exports.User = void 0;
var forge = __importStar(require("node-forge"));
var transaction_1 = require("./transaction");
var utilities_1 = require("./utilities");
var User = /** @class */ (function () {
    function User() {
        this.seed = forge.random.getBytesSync(32);
        this.ed25519 = forge.pki.ed25519;
        var keypair = this.ed25519.generateKeyPair({ seed: this.seed });
        this.sk = keypair.privateKey.toString('hex');
        this.pk = keypair.publicKey.toString('hex');
    }
    User.prototype.createTr = function (to, amount) {
        var privateKey = (0, utilities_1.convertToBytes)(this.sk);
        var signature = forge.pki.ed25519.sign({ message: to, privateKey: privateKey, encoding: 'utf8' }).toString('hex');
        return new transaction_1.Transaction(this.pk, to, amount, signature);
    };
    return User;
}());
exports.User = User;
