import MerkleTree from 'merkletreejs';
import { Transaction } from './transaction';
import {convertToBytes, hashFn} from './utilities'

export class Block{
    private hash:string;
    private ts : number;
    public nonce : number;
    public tree: MerkleTree;
    private root : any;

    constructor(trs: Transaction[], private prevH: string){
        this.tree = new MerkleTree(trs.map(t=>t.hash),hashFn, {isBitcoinTree: true});
        this.ts = new Date().getTime();
        this.root = this.tree.getHexRoot()
        this.powPowPow(this.root);
    }

    public getHash() : string{
        return this.hash;
    }

    
    public getPrevHash() : string{
        return this.prevH;
    }

    public calculateHash() : string{
        return hashFn(this.prevH+this.nonce.toString()+this.ts+this.tree.getHexRoot());
    }

    private powPowPow(root:string) {
        let nonce =-1;
        let hash = '';
        let notFound = true;

        while(notFound){
            nonce++;
            hash = hashFn(this.prevH+nonce.toString()+this.ts+this.root);
            if(this.isCorrectHash(hash)) notFound = false;
        }
        this.nonce = nonce;
        this.hash = hash;
    }

    private isCorrectHash(hash:string) : boolean{
        return hash.startsWith('0000');
    }
}


