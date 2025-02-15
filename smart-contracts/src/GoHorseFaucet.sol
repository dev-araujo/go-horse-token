// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./GoHorseToken.sol";

// Erros personalizados
error WalletAlreadyClaimed();
error FreeTokensExhausted();

/**
 * @title GoHorse Faucet
 * @author https://github.com/dev-araujo
 * @notice Um contrato Faucet para distribuir tokens GoHorse
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20
 */
contract GoHorseFaucet {
    GoHorse private token;
    address private owner;
    uint256 private constant FREE_TOKENS_LIMIT = 10;
    uint256 private constant TOKEN_AMOUNT = 1 * 10 ** 18;
    uint256 private freeTokensDistributed = 0;
    mapping(address => bool) private hasClaimed;

    /**
     * @param _tokenAddress O endereço do contrato GoHorse.
     */
    constructor(address _tokenAddress) {
        token = GoHorse(_tokenAddress);
        owner = msg.sender;
    }

    /**
     * @notice Modificador para restringir funções ao proprietário
     */
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

    /**
     * @param _tokenAddress O endereço do contrato do token GoHorse.
     */
    function setTokenContract(address _tokenAddress) external onlyOwner {
        token = GoHorse(_tokenAddress);
    }
}
