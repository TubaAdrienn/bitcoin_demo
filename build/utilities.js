"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToBytes = exports.hashFn = void 0;
var node_forge_1 = __importDefault(require("node-forge"));
function hashFn(data) {
    return node_forge_1.default.md.sha256.create().update(data).digest().toHex();
}
exports.hashFn = hashFn;
function convertToBytes(hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) { return parseInt(h, 16); }));
}
exports.convertToBytes = convertToBytes;
