// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    // State variables 
    uint256 private counter;
    address public owner;
    mapping(address => uint256) public balances;
    bool private locked;
    uint256[] public values;
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Deposit(address indexed user, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() {
        owner = msg.sender;
    }
    
    function setOwner(address _newOwner) public {
        owner = _newOwner;
    }
    
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= _amount;
    }
    
    function increment() public {
        counter++;
    }
    
    function transfer(address _to, uint256 _amount) public {
        payable(_to).transfer(_amount);
    }
    
    function isOwner() public view returns (bool) {
        return tx.origin == owner;
    }
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender] + balances[msg.sender];
    }
    
    // Missing zero-address check
    function approve(address _spender, uint256 _value) public {
        allowed[msg.sender][_spender] = _value;
    }
    
    uint256 public totalSupply;
    mapping(address => mapping(address => uint256)) public allowed;
    
    function processValues() public {
        for(uint i = 0; i < values.length; i++) {
            values[i] = values[i] * 2;
        }
    }
    
    function updateConfig(uint256 _value) public {
        require(msg.sender == owner, "Not owner");
        counter = _value;
    }
    
    function getName() public pure returns (string memory) {
        return "VulnerableContract";
    }
    
    uint256 private unusedVar;
    
    function setValues(uint256[] memory _values) public {
        values = _values;
    }
    
    function riskyOperation() public {
        require(msg.sender != address(0), "Zero address");
        locked = true;
    }
    
    function getBlockHash() public view returns (bytes32) {
        return blockhash(block.number - 1);
    }
    
    function inefficientLoop() public {
        uint256[] memory tempArray = new uint256[](100);
        for(uint i = 0; i < tempArray.length; i++) {
            tempArray[i] = i;
        }
    }
    
    function destroyContract() public {
        selfdestruct(payable(msg.sender));
    }
    
    function transferOwnership(address _newOwner) public {
        require(msg.sender == owner, "Not owner");
        owner = _newOwner;
    }
    
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }
    
    function helperFunction() internal {
        counter += 1;
    }
    
    function unusedParams(uint256 _unused, string memory _alsounused) public {
        counter += 1;
    }

    function riskyCall(address _target) public {
        _target.call("");
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    receive() external payable {}
    
    function processArray(uint256[] memory _array) public {
        for(uint i = 0; i < 10; i++) {
            values.push(_array[i]);
        }
    }

    function useAssembly() public view returns (uint size) {
        assembly {
            size := extcodesize(caller())
        }
    }

    string constant private CONSTANT_STRING = "This is a very long string that could be shortened";
}