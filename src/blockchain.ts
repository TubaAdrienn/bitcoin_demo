import { Block } from "./block";
import { Transaction } from "./transaction";
import { hashFn } from "./utilities";

export class BlockChain{
    private blocks : Block[] = []
    public pendingTransactions : Transaction[] = [];
    private miningReward = 100;

    constructor(){
        this.createInitialBlock();
        console.log('Blockchain created.');
    }

    createInitialBlock(){
        this.blocks.push(new Block([new Transaction(null,"to",0,null)], hashFn("-"))); 
    }

    public getLastBlock(){
        return this.blocks[this.blocks.length-1];
    }

    public mine(rewardAdress: string){
        let block = new Block(this.pendingTransactions, this.getLastBlock().getHash());
        console.log("Block mined!");
        this.blocks.push(block);
        this.pendingTransactions = [new Transaction(null, rewardAdress, this.miningReward,null)];
    }

    addTransaction(transaction: Transaction){
        if(!transaction.from || !transaction.to) throw new Error('No address. Nope.');
        if(!transaction.isValid()) throw new Error("Transaction is not valid.");
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAdress(address: string){
        let balance = 0;

        for(const block of this.blocks){
            for(const trans of block.getTransactions()){
                if(trans.from === address) balance-=trans.amount;
                if(trans.to === address) balance +=trans.amount;
            }
        }
        return balance;
    }

    isChainValid(){
        console.log("Validation: ");
        for(let i=1; i< this.blocks.length; i++ ){
            const current = this.blocks[i];
            const prev = this.blocks[i-1];

            if(!current.hasValidTr()) return false;
            if(current.getHash() !== current.calculateHash()) return false;
            if(current.getPrevHash() !== prev.getHash()) return false;  
        }
        return true;
    }
}