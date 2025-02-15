// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./GoHorseToken.sol";

error WalletAlreadyClaimed();
error FreeTokensExhausted();

contract GoHorseFaucet {
    GoHorse private token;
    address private owner;
    uint256 private constant FREE_TOKENS_LIMIT = 10;
    uint256 private constant TOKEN_AMOUNT = 1 * 10 ** 18;
    uint256 private freeTokensDistributed = 0;
    mapping(address => bool) private hasClaimed;

    constructor(address _tokenAddress) {
        token = GoHorse(_tokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    function requestTokens() external {
        if (hasClaimed[msg.sender]) revert WalletAlreadyClaimed();
        if (freeTokensDistributed >= FREE_TOKENS_LIMIT)
            revert FreeTokensExhausted();

        hasClaimed[msg.sender] = true;
        freeTokensDistributed += 1;
        token.mintNewTokens(msg.sender, TOKEN_AMOUNT);
    }

    function getFreeTokensDistributed() external view returns (uint256) {
        return freeTokensDistributed;
    }

    function setTokenContract(address _tokenAddress) external onlyOwner {
        token = GoHorse(_tokenAddress);
    }
}
