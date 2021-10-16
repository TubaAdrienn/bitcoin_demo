import MerkleTree from 'merkletreejs';
import { Transaction } from './transaction';
import {hashFn} from './utilities'

export class Block{
    private hash:string;
    private ts : number;
    public nonce : number;
    private tree: MerkleTree;

    constructor(private trs: Transaction[], private prevH: string){
        this.tree = new MerkleTree(trs.map(t=>t.hash),hashFn, {isBitcoinTree: true});
        this.ts = new Date().getTime();
        this.powPowPow(this.tree.getHexRoot());
    }

    public getTransactions(){
        return this.trs;
    }


    public getHash() : string{
        return this.hash;
    }

    
    public getPrevHash() : string{
        return this.prevH;
    }

    public calculateHash() : string{
        return hashFn(this.prevH+this.nonce.toString()+this.tree.getHexRoot());
    }

    private powPowPow(root:string) {
        let nonce =-1;
        let hash = '';
        let notFound = true;

        while(notFound){
            nonce++;
            hash = hashFn(this.prevH+nonce.toString()+root);
            if(this.isCorrectHash(hash)) notFound = false;
        }
        this.nonce = nonce;
        this.hash = hash;
    }

    private isCorrectHash(hash:string) : boolean{
        return hash.startsWith('0000');
    }

    hasValidTr(){
        for(const tx of this.trs){
            if(!tx.isValid()) return false;
        }
        console.log("Has valid transactions.");
        return true;
    }
}


