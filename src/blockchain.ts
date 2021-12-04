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
        return new Block(this.pendingTransactions, hashFn("-")); 
    }

    public getLastBlock(){
        return this.blocks[this.blocks.length-1];
    }

    public mine(rewardAdress: string){
        let block;
        if(this.blocks.length==0) block = this.createInitialBlock();
        else block = new Block(this.pendingTransactions, this.getLastBlock().getHash());
        console.log("Block mined!");
        this.blocks.push(block);

        for(let trx of this.pendingTransactions){
            if(!this.isInTree(trx.hash, block.tree)) console.log("Not in the tree.");
        }
    
        this.pendingTransactions = [new Transaction(null, rewardAdress, this.miningReward,null)];
    }

    addTransaction(transaction: Transaction){
        if(!transaction.from || !transaction.to) throw new Error('No address. Nope.');
        if(!transaction.signoCheck()) throw new Error("Transaction is not valid.");
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

    isInTree(hash: string, root: MerkleTree){
        const hashB = Buffer.from(convertToBytes(hash));
        return root.verify(root.getProof(hashB), hashB, Buffer.from(convertToBytes(root.getHexRoot())));
    }
}