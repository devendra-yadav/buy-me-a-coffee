//SPDX-License-Identifier: MIT

//Contract deployed at georli network : 0x133aBd42B6EcAB04DA3fE37b4178953A2D914212

pragma solidity ^0.8.9;

contract BuyACoffee{
    //Contract owner address
    address payable public owner;

    //event whenever new memo is created
    event NewMemo(address indexed sender, uint256 timestamp, string name, string message);

    //memo struct
    struct Memo{
        address sender;
        uint256 timestamp;
        string name;
        string message;
    }

    //store all memos on blockchain
    Memo[] allMemos;

    //modifier for functions that can be run only by the owner.
    modifier onlyOwner {
        require(msg.sender==owner, "Only contract owner can execute this");
        _;
    }

    //constructor. setting the owner.
    constructor(){
        owner=payable(msg.sender);
    }

    /**
    @dev Buy a coffee for the contract owner.
    @param _name name of the sender
    @param _message message from the sender
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value>0,"Insufficient ether sent.");
        require(msg.value<msg.sender.balance, "Insufficient ether in the wallet of the sender");

        Memo memory memo=Memo(msg.sender, block.timestamp, _name, _message);
        allMemos.push(memo);
        emit NewMemo(msg.sender, block.timestamp, _name, _message);

    }

    /**
    @dev function for owner of the contract to transfer all balance to his own wallet
     */
    function withdrawTips() public onlyOwner{
        require(address(this).balance>0,"No balance in the contract to withdraw");
        owner.transfer(address(this).balance);
    }

    /**
    @dev function to get all the memos
     */
    function getAllMemos() public view returns(Memo[] memory){
        return allMemos;
    }   
}