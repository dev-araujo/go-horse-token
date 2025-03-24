// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

error ExceedsMaxSupply();
error InvalidAmount();
error InsufficientBalance();
error TransferFailed();
error ExactFeeRequired();

/**
 * @title GoHorse Token (GOHO)
 * @author https://github.com/dev-araujo
 * @notice Implementação segura e otimizada de um token ERC20 para o projeto GoHorse.
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20 com proteção contra reentrância.
 */
contract GoHorse is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 10000 * 10 ** 18;
    string private s_metadataUrl;
    uint256 private s_totalMinted;
    uint256 public mintFee;
    address public feeRecipient;

    event TokensMinted(address indexed to, uint256 amount);
    event MintFeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);
    event FeeTransferred(address indexed recipient, uint256 amount);

    /**
     * @notice Construtor do contrato do token.
     * @param metadataUrl URL de metadados do token.
     * @param _mintFee Taxa de mintagem em wei.
     * @param _feeRecipient Endereço que receberá a taxa de mintagem.
     */
    constructor(
        string memory metadataUrl,
        uint256 _mintFee,
        address _feeRecipient
    ) ERC20("Go Horse", "GOHO") Ownable(msg.sender) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        s_metadataUrl = metadataUrl;
        mintFee = _mintFee;
        feeRecipient = _feeRecipient;
    }

    /**
     * @notice Mintagem de novos tokens.
     * @dev Protegido contra reentrância e com verificações de segurança.
     * @param to Endereço que receberá os tokens.
     * @param amount Quantidade de tokens a serem mintados (em wei).
     */
    function mint(address to, uint256 amount) external payable nonReentrant {
        require(to != address(0), "Invalid recipient");
        if (amount % (10 ** 18) != 0) {
            revert InvalidAmount();
        }
        if (s_totalMinted + amount > MAX_SUPPLY) {
            revert ExceedsMaxSupply();
        }

        uint256 tokenAmount = amount / (10 ** 18);
        uint256 requiredFee = mintFee * tokenAmount;
        if (msg.value < requiredFee) {
            revert InsufficientBalance();
        }
        if (msg.value != requiredFee) {
            revert ExactFeeRequired();
        }

        _mint(to, amount);
        s_totalMinted += amount;

        if (msg.value > 0) {
            (bool success, ) = feeRecipient.call{value: msg.value}("");
            if (!success) {
                revert TransferFailed();
            }
            emit FeeTransferred(feeRecipient, msg.value);
        }

        emit TokensMinted(to, amount);
    }

    /**
     * @notice Atualiza a taxa de mintagem.
     * @dev Apenas o proprietário pode atualizar a taxa.
     * @param _mintFee Nova taxa de mintagem em wei.
     */
    function setMintFee(uint256 _mintFee) external onlyOwner {
        mintFee = _mintFee;
        emit MintFeeUpdated(_mintFee);
    }

    /**
     * @notice Atualiza o endereço que recebe a taxa de mintagem.
     * @dev Apenas o proprietário pode atualizar o endereço.
     * @param _feeRecipient Novo endereço que receberá a taxa.
     */
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid address");
        feeRecipient = _feeRecipient;
        emit FeeRecipientUpdated(_feeRecipient);
    }

    /**
     * @notice Retorna a URL de metadados do token.
     * @return A URL contendo informações sobre o token.
     */
    function getMetadataUrl() external view returns (string memory) {
        return s_metadataUrl;
    }

    /**
     * @notice Retorna o total de tokens mintados.
     * @return O total de tokens mintados.
     */
    function getTotalMinted() external view returns (uint256) {
        return s_totalMinted;
    }

    /**
     * @notice Retorna o suprimento máximo de tokens.
     * @return O suprimento máximo de tokens.
     */
    function getMaxSupply() external pure returns (uint256) {
        return MAX_SUPPLY;
    }
}