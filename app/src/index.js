import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createBank: async function() {
    const { createBank } = this.meta.methods;
    const address = document.getElementById("bankaddress").value;
    const amount = document.getElementById("amount").value;
    await createBank(address, amount).send({from: this.account});
    App.setStatus("New Bank created at address " + this.account + ".");
  },

  createUser: async function() {
    const { createUser } = this.meta.methods;
    const bankaddress = document.getElementById("bankaddress").value;
    const amount = document.getElementById("amount").value;
    const address = document.getElementById("useraddress").value;
    await createUser(amount,address,bankaddress).send({from: this.account});
    App.setStatus("New User created with address " + this.account + ".");
  },

  transferBetweenUsers: async function() {
    const { transferBetweenUsers } = this.meta.methods;
    const fromaddress = document.getElementById("fromaddress").value;
    const amount = document.getElementById("amount").value;
    const toaddress = document.getElementById("toaddress").value;
    await transferBetweenUsers(fromaddress,toaddress,amount).send({from: this.account});
    App.setStatus("Amount :"+ amount +"transferred from addresses :" + fromaddress + "to :" +toaddress );
  },

  // Implement Task 4 Modify the front end of the DAPP
  balanceOfUser: async function (){
    const { balanceOfUser } = this.meta.methods;
    const address = document.getElementById("address").value;
    let value = await balanceOfUser(address).call({from: this.account});
    App.setStatus("Balance in address:" + value + ".");
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});
