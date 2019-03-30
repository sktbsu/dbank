pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract StarNotary is ERC20Detailed, ERC20 {

    mapping (address => bool) internal validUsers;
    mapping (address => bool) internal validBanks;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _initialSupply)
    ERC20Detailed(_name, _symbol, _decimals) public {
        require(_initialSupply > 0, "INITIAL_SUPPLY has to be greater than 0");
        _mint(msg.sender, _initialSupply);
    }

    function createBank(address _bankaddress, uint256 _amount) public {
      require(ERC20.totalSupply() > _amount, "INITIAL_SUPPLY has to be greater than amount");
      transfer(_bankaddress, _amount);
      validBanks[_bankaddress]=true;
    }


    function createUser(uint256 _amount,address _address,address _bankaddress) public {
      require(balanceOf(_bankaddress) > _amount, "INITIAL_SUPPLY has to be greater than amount");
      _transfer(_bankaddress, _address, _amount);
      validUsers[_address]=true;
    }

    function transferBetweenUsers(address _address1, address _address2,uint256 _amount) public{
      require(validUsers[_address1] == true, "User not present");
      require(validUsers[_address2] == true, "User not present");
      _transfer(_address1, _address2, _amount);
    }

    function balanceOfUser(address _address) public view returns(uint256){
      require(validUsers[_address] == true);
      return balanceOf(_address);
    }

    function balanceOfBank(address _address) public view returns(uint256){
      require(validBanks[_address] == true);
      return balanceOf(_address);
    }
}
