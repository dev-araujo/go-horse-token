// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error ExceedsMaxSupply(); // Erro lançado quando a mintagem excede o suprimento máximo.

/**
 * @title GoHorse Token (GOHO)
 * @author https://github.com/dev-araujo
 * @notice Implementação de um token ERC20 para o projeto GoHorse.
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20.
 */

contract GoHorse is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 10000 * 10 ** 18;
    string private s_metadataUrl;
    uint256 private s_totalMinted;
    uint256 public mintFee;
    address public feeRecipient;

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
        s_metadataUrl = metadataUrl;
        mintFee = _mintFee;
        feeRecipient = _feeRecipient;
        s_totalMinted = 0;
    }

    /**
     * @notice Mintagem de novos tokens.
     * @dev Apenas o proprietário pode mintar novos tokens.
     * @param to Endereço que receberá os tokens.
     * @param amount Quantidade de tokens a serem mintados.
     */
    function mint(address to, uint256 amount) external payable {
        if (s_totalMinted + amount > MAX_SUPPLY) {
            revert ExceedsMaxSupply();
        }
        uint256 tokenAmount = amount / (10 ** 18);
        if (amount % (10 ** 18) != 0) {
            revert("A mintagem deve ser um numero inteiro");
        }
        uint256 requiredFee = mintFee * tokenAmount;
        if (msg.value < requiredFee) {
            revert("Saldo Insuficiente");
        }
        _mint(to, amount);
        s_totalMinted += amount;
        payable(feeRecipient).transfer(msg.value);
    }

    /**
     * @notice Retorna a URL de metadados do token.
     * @return A URL contendo informações sobre o token (imagem, descrição, etc.).
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

    /**
     * @notice Atualiza a taxa de mintagem.
     * @dev Apenas o proprietário pode atualizar a taxa.
     * @param _mintFee Taxa de mintagem em wei.
     */
    function setMintFee(uint256 _mintFee) external onlyOwner {
        mintFee = _mintFee;
    }

    /**
     * @notice Atualiza o endereço que recebe a taxa de mintagem.
     * @dev Apenas o proprietário pode atualizar o endereço.
     * @param _feeRecipient Endereço que receberá a taxa de mintagem.
     */
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        feeRecipient = _feeRecipient;
    }
}
