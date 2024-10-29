// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureToken {
    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);

    // State variables
    string public name = "SecureToken";
    string public symbol = "SEC";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;
    
    // Constants
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant MAX_MINT_PER_TX = 10000 * 10**18; // 10k tokens
    
    // Reentrancy guard
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    // Mappings
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Modifiers
    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
        _status = _NOT_ENTERED;
        _mint(msg.sender, 100000 * 10**18); // 100k initial supply
    }

    // Internal mint function
    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    // Internal burn function
    function _burn(address from, uint256 amount) internal {
        require(balanceOf[from] >= amount, "Insufficient balance");
        
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    // External functions
    function mint(address to, uint256 amount) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= MAX_MINT_PER_TX, "Amount exceeds max mint per transaction");
        
        _mint(to, amount);
        emit Minted(to, amount);
    }

    function burn(uint256 amount) 
        external 
        nonReentrant 
    {
        require(amount > 0, "Amount must be greater than 0");
        _burn(msg.sender, amount);
        emit Burned(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) 
        public 
        nonReentrant 
        returns (bool) 
    {
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) 
        public 
        returns (bool) 
    {
        require(spender != address(0), "Cannot approve zero address");
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) 
        public 
        nonReentrant 
        returns (bool) 
    {
        require(from != address(0), "Cannot transfer from zero address");
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");

        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}