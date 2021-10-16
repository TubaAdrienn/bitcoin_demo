import forge from "node-forge";

export function hashFn(data: string): string {
    return forge.md.sha256.create().update(data).digest().toHex();
}

export function convertToBytes(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)))
}
