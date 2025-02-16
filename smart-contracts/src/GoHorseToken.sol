// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// Erros personalizados
error InvalidInitialSupply();
error OnlyOwner();

/**
 * @title GoHorse
 * @author https://github.com/dev-araujo
 * @notice Contrato para criação do token ERC20 Go Horse
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20
 */
contract GoHorse is ERC20 {
    uint256 private constant TOKEN_MULTIPLIER = 10 ** 18;
    address private s_owner;

    uint256 public constant MAX_SUPPLY = 5000 * TOKEN_MULTIPLIER;

    event InitialSupplyMinted(address indexed to, uint256 amount);

    /**
     * @param initialSupply Quantidade inicial de tokens a serem cunhados
     */
    constructor(uint256 initialSupply) ERC20("Go Horse", "GOHO") {
        s_owner = msg.sender;
        _mintInitialSupply(s_owner, initialSupply);
    }

    /**
     * @notice Modificador para restringir funções ao proprietário
     */
    modifier onlyOwner() {
        if (msg.sender != s_owner) revert OnlyOwner();
        _;
    }

    /**
     * @notice Cunha o fornecimento inicial de tokens
     * @dev Verifica se o fornecimento inicial é válido e cunha os tokens
     * @param to Endereço que receberá os tokens
     * @param initialSupply Quantidade inicial de tokens a serem cunhados
     */
    function _mintInitialSupply(address to, uint256 initialSupply) internal {
        uint256 initialSupplyInWei = initialSupply * TOKEN_MULTIPLIER;

        if (initialSupply <= 0 || initialSupplyInWei > MAX_SUPPLY)
            revert InvalidInitialSupply();

        _mint(to, initialSupplyInWei);
        emit InitialSupplyMinted(to, initialSupplyInWei);
    }

    /**
     * @notice Cunha novos tokens
     * @dev Restrito ao proprietário. Verifica se a quantidade é válida antes de cunhar
     * @param to Endereço que receberá os tokens
     * @param amount Quantidade de tokens a serem cunhados
     */
    function mintNewTokens(address to, uint256 amount) external onlyOwner {
        uint256 amountToMint = amount * TOKEN_MULTIPLIER;

        if (totalSupply() + amountToMint > MAX_SUPPLY || amountToMint <= 0) {
            revert InvalidInitialSupply();
        }

        _mint(to, amountToMint);
    }

    /**
     * @notice Retorna o endereço do proprietário do contrato
     * @return Endereço do proprietário
     */
    function getOwner() external view returns (address) {
        return s_owner;
    }
}
