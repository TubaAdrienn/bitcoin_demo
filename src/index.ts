import { BlockChain } from "./blockchain";
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
console.log('\nBalance of miner is: '+chain.getBalanceOfAdress(user1.pk))

console.log('Creating transactions.');
var tr5 = user2.createTr(user2.pk, 10);
chain.addTransaction(tr5);
var tr6 = user1.createTr(user3.pk, 10);
chain.addTransaction(tr6);
console.log('Transactions added.')

console.log('\nStarting the mining...')
chain.mine(user1.pk);
console.log('\nBalance of miner is: '+chain.getBalanceOfAdress(user1.pk))

console.log(chain.isChainValid());


