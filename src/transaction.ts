import { convertToBytes, hashFn } from "./utilities";
import * as forge from 'node-forge';

export class Transaction{
    public hash : string;
    private ts = new Date().getTime();
    private ed25519 = forge.pki.ed25519;

    constructor(public from: string, public to: string, public amount: number, private sign : string){
        this.hash = hashFn(from+to+amount+this.ts+this.sign);
    }

    isValid(){
        if(this.from == null) return true;
        if(!this.sign || this.sign.length==0) throw new Error('No signature.');

        const isOk = this.ed25519.verify({ 
            message: this.to,
            encoding: 'utf8',
            signature: convertToBytes(this.sign),
            publicKey: convertToBytes(this.from)
        })

        console.log("Valid transaction.");
        return isOk;
    }

}