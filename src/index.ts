import { Block } from "./block";
import { BlockChain } from "./blockchain";
import { Transaction } from "./transaction";
import { User } from "./user";

var user1=new User();
var user2=new User();
var user3=new User();
var user4=new User();

let chain = new BlockChain();

console.log('Creating transactions.');
var tr1 = user1.createTr(user2.pk, 10);
chain.addTransaction(tr1);
var tr2 = user4.createTr(user3.pk, 20);
chain.addTransaction(tr2);
var tr3 = user3.createTr(user4.pk, 20);
chain.addTransaction(tr3);
var tr4 = user2.createTr(user1.pk, 40);
chain.addTransaction(tr4);
console.log('Transactions added.')

console.log('\nStarting the mining...')
chain.mine(user1.pk);

console.log('Creating transactions.');
var tr5 = user2.createTr(user2.pk, 10);
chain.addTransaction(tr5);
var tr6 = user1.createTr(user3.pk, 10);
chain.addTransaction(tr6);
console.log('Transactions added.')

console.log('\nStarting the mining...')
chain.mine(user1.pk);

console.log("\nValidity of chain: " + chain.isChainValid());
console.log("Chain length: "+ chain.blocks.length);

chain.blocks.push(new Block([new Transaction(user1.pk,user2.pk,10000,"9308ed1cc01cce2d1bd6235eddbeafeb57f8a5c12c001f08609b85f216723d7b808462cc9627bea63c0906fe9a937c3bc195b3dc4513b4b54f066f86d6298a0d")], chain.getLastBlock().getHash()))
console.log("\nIs chain valid: "+chain.isChainValid());