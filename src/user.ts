import * as forge from 'node-forge';
import { Transaction } from './transaction';
import {convertToBytes} from './utilities'

export class User{
    public pk : any;
    private readonly sk : any;
    private seed = forge.random.getBytesSync(32);
    private ed25519 = forge.pki.ed25519;

    constructor(){
        const keypair = this.ed25519.generateKeyPair({seed: this.seed});
        this.sk = keypair.privateKey.toString('hex');
        this.pk=keypair.publicKey.toString('hex');
    }

    createTr(to: string, amount: number){
        const privateKey = convertToBytes(this.sk);
        var signature = forge.pki.ed25519.sign({ message: to,
            privateKey,
            encoding: 'utf8'
        }).toString('hex');
        return new Transaction(this.pk, to, amount, signature);
    }
}
