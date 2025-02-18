// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

error InvalidInitialSupply(); /// @notice Erro lançado quando a quantidade inicial de tokens excede o limite máximo.
error OnlyOwner(); /// @notice Erro lançado quando uma função restrita ao proprietário é chamada por outro endereço.
error MaxSupplyExceeded(); /// @notice Erro lançado quando a mintagem ultrapassa o suprimento máximo.

/**
 * @title GoHorse Token (GOHO)
 * @author https://github.com/dev-araujo
 * @notice Implementação de um token ERC20 para o projeto GoHorse.
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20.
 */
contract GoHorse is ERC20 {
    uint256 private constant TOKEN_MULTIPLIER = 10 ** 18;
    address private s_owner;
    string private s_metadataUrl;
    mapping(address => bool) private minters;

    uint256 public constant MAX_SUPPLY = 5000 * TOKEN_MULTIPLIER;

    /// @notice Evento emitido quando o suprimento inicial é mintado.
    event InitialSupplyMinted(address indexed to, uint256 amount);
    event MinterUpdated(address indexed minter, bool status);

    /**
     * @notice Construtor do contrato do token.
     * @param initialSupply Quantidade inicial de tokens a serem cunhados.
     * @param metadataUrl URL de metadados do token.
     */
    constructor(
        uint256 initialSupply,
        string memory metadataUrl
    ) ERC20("Go Horse", "GOHO") {
        s_owner = msg.sender;
        s_metadataUrl = metadataUrl;
        minters[msg.sender] = true;
        _mintInitialSupply(s_owner, initialSupply * TOKEN_MULTIPLIER);
    }

    modifier onlyOwner() {
        if (msg.sender != s_owner) {
            revert OnlyOwner();
        }
        _;
    }

    modifier onlyMinter() {
        require(minters[msg.sender], "Not authorized to mint");
        _;
    }

    /**
     * @notice Define um novo minter para o contrato.
     * @param minter O endereço que poderá mintar tokens.
     * @param isAllowed Booleano indicando se o endereço pode ou não mintar.
     */
    function setMinter(address minter, bool isAllowed) external onlyOwner {
        minters[minter] = isAllowed;
        emit MinterUpdated(minter, isAllowed);
    }

    /**
     * @notice Mintagem inicial de tokens.
     * @param to O endereço que receberá os tokens.
     * @param amount A quantidade de tokens a serem mintados.
     */
    function _mintInitialSupply(address to, uint256 amount) internal {
        if (amount > MAX_SUPPLY) {
            revert InvalidInitialSupply();
        }
        _mint(to, amount);
        emit InitialSupplyMinted(to, amount);
    }

    /**
     * @notice Mintagem de novos tokens.
     * @dev Apenas minters podem mintar novos tokens.
     * @param to O endereço que receberá os tokens.
     * @param amount A quantidade de tokens a serem mintados.
     */
    function mint(address to, uint256 amount) external onlyMinter {
        if (totalSupply() + amount > MAX_SUPPLY) {
            revert MaxSupplyExceeded();
        }
        _mint(to, amount);
    }

    /**
     * @notice Obtém a URL de metadados do token.
     * @return A URL contendo informações sobre o token (imagem, descrição, etc.).
     */
    function getMetadataUrl() external view returns (string memory) {
        return s_metadataUrl;
    }

    /**
     * @notice Retorna o endereço do proprietário do contrato.
     * @return O endereço do proprietário.
     */
    function owner() external view returns (address) {
        return s_owner;
    }
}
