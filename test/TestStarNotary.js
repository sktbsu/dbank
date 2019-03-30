const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('Transfer Between users', async() => {
    let instance = await StarNotary.deployed();
    await instance.createBank(accounts[5],500);
    await instance.createBank(accounts[6],500);
    await instance.createUser(100,accounts[3],accounts[5]);
    await instance.createUser(50,accounts[4],accounts[6]);
    await instance.transferBetweenUsers(accounts[3],accounts[4],10);
    assert.equal(  await instance.balanceOfUser(accounts[4]), 60);
    assert.equal(  await instance.balanceOfUser(accounts[3]), 90);
});

it('find Bank balance test', async() => {
      let instance = await StarNotary.deployed();
      await instance.createBank(accounts[1],500);
      assert.equal(  await instance.balanceOfBank(accounts[1]), 500);
});

it('find user balance test', async() => {
      let instance = await StarNotary.deployed();
      await instance.createUser(50,accounts[2],accounts[1]);
      assert.equal(  await instance.balanceOfUser(accounts[2]), 50);
      assert.equal(  await instance.balanceOfBank(accounts[1]), 450);
});
