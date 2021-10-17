import { Block } from "./block";
import { Transaction } from "./transaction";
import { hashFn, convertToBytes } from "./utilities";
import MerkleTree from 'merkletreejs';

export class BlockChain{
    public blocks : Block[] = []
    public pendingTransactions : Transaction[] = [];
    private miningReward = 100;

    constructor(){
        console.log('Blockchain created.');
    }

    createInitialBlock(){
        this.blocks.push(new Block(this.pendingTransactions, hashFn("-"))); 
    }

    public getLastBlock(){
        return this.blocks[this.blocks.length-1];
    }

    public mine(rewardAdress: string){
        if(this.blocks.length==0) this.createInitialBlock();
        let block = new Block(this.pendingTransactions, this.getLastBlock().getHash());
        console.log("Block mined!");
        
        for(let trx of this.pendingTransactions){
            this.isValidTr(trx.hash, this.blocks[0].tree)
        }
        
        this.blocks.push(block);
        this.pendingTransactions = [new Transaction(null, rewardAdress, this.miningReward,null)];
    }

    addTransaction(transaction: Transaction){
        if(!transaction.from || !transaction.to) throw new Error('No address. Nope.');
        if(!transaction.isValid()) throw new Error("Transaction is not valid.");
        this.pendingTransactions.push(transaction);
    }

    isChainValid(){
        for(let i=1; i< this.blocks.length; i++ ){
            const current = this.blocks[i];
            const prev = this.blocks[i-1];

            if(current.getHash() !== current.calculateHash()) return false;
            if(current.getPrevHash() !== prev.getHash()) return false;  
        }
        console.log("Valid chain. ");
        return true;
    }

    isValidTr(hash: string, root: MerkleTree){
        const hashBytes = Buffer.from(convertToBytes(hash));
        const rootBytes = Buffer.from(convertToBytes(root.getHexRoot()));
        const proof = root.getProof(hashBytes);
        return root.verify(proof, hashBytes, rootBytes);
    }
}