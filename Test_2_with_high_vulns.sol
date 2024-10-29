// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    // Uninitialized state variable (high-severity vulnerability)
    address public owner;
    mapping(address => uint256) public balances;

    // 1. Reentrancy vulnerability (state update after external call)
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Vulnerable: external call before state update (reentrancy issue)
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;  // State update after external call
    }

    // 2. Unchecked low-level call (high-severity vulnerability)
    function unsafeTransfer(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only owner can transfer");
        
        // Vulnerable: no return value check on low-level call
        recipient.call{value: amount}("");
    }

    // 3. Block timestamp used for critical logic (high-severity vulnerability)
    function isExpired(uint256 expirationTime) public view returns (bool) {
        return block.timestamp > expirationTime;
    }

    // 4. Arbitrary function execution (access control vulnerability)
    function setOwner(address newOwner) public {
        owner = newOwner;  // No access control, anyone can set the owner
    }

    // 5. Transfer entire contract balance (no proper access control)
    function drain(address payable recipient) public {
        require(msg.sender == owner, "Only owner can drain the contract");

        // Transfer all funds to the recipient (arbitrary transfer vulnerability)
        (bool success, ) = recipient.call{value: address(this).balance}("");
        require(success, "Drain failed");
    }

    // 6. Receive function to accept ETH
    receive() external payable {}
}
