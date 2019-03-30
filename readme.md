#Decentralized Bank

Smart Contract: Initially the total number of tokens present of type provided by user is created.
totalSupply, name ,symbol is provided by user in deploy contract.js file
Then we can create bank accounts from address whose total value is less than totalSupply
We can create users by giving bankaddress and wallet address of users.
We check if users amount is less than the total value of bank and if true we start a new user account with the given amount.

All transaction will remain in BlockChain network.
You can transfer money from one address to another address.
You can check your account balance by giving your address.


 ERC20 Token
 Truffle version: 1.0.2
 OpenZeppelin version: 2.1.2


 Deploy:(using truffle)
 Truffle develop will deploy the smart contract in your local block chain
 Then compile and migrate --reset to deploy the smart contract
 run test to run the test cases written in TestStarNotary.js

 Go to app folder and npm run dev.... This will start the website in http://localhost:8080


 Scale Up:
 We can use mint function of ERC20 to add more totalSupply of type token.
 We can also deploy this in rinkeby test network by providing mnemonic and infuraKey in truffle-config.js file

 We can use increaseAllowance/decreaseAllowance of ERC20 to increase total allowance of users
