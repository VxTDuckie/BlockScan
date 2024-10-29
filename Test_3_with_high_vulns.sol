// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NonEtherReentrancyContract {
    // Uninitialized state variable (high-severity vulnerability)
    address public owner;

    mapping(address => uint256) public userPoints;
    mapping(address => bool) public rewardedUsers;

    // Initialize owner in the constructor
    constructor() {
        owner = msg.sender;
    }

    // 1. Reentrancy vulnerability: State can be manipulated by reentrant calls
    function rewardPoints(address user, uint256 points) public {
        require(!rewardedUsers[user], "User already rewarded");

        // Mark the user as rewarded (vulnerable to reentrancy)
        rewardedUsers[user] = true;

        // External call, vulnerable to reentrancy
        (bool success, ) = user.call("");
        require(success, "External call failed");

        // Update user points after external call (reentrancy risk)
        userPoints[user] += points;
    }

    // 2. Unchecked low-level call vulnerability
    function updateOwner(address newOwner) public {
        require(msg.sender == owner, "Not the contract owner");

        // Unchecked low-level call
        (bool success, ) = newOwner.call("");
        // No success check — possible state inconsistency

        owner = newOwner;
    }

    // 3. Block timestamp used in business logic (manipulatable by miners)
    function isGameActive(uint256 startTime, uint256 duration) public view returns (bool) {
        // Vulnerable: Uses block.timestamp for critical logic
        return block.timestamp >= startTime && block.timestamp <= startTime + duration;
    }

    // 4. Arbitrary state manipulation (owner-only action but still vulnerable)
    function resetUser(address user) public {
        require(msg.sender == owner, "Only owner can reset users");

        // Vulnerability: Arbitrary state reset without checks
        userPoints[user] = 0;
        rewardedUsers[user] = false;
    }

    // 5. Receive function to accept ETH (no ETH manipulation in vulnerabilities)
    receive() external payable {}
}
