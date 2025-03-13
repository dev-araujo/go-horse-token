// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error ExceedsMaxSupply(); // Erro lançado quando a mintagem excede o suprimento máximo.
error InvalidInitialSupply(); // Erro lançado quando o suprimento inicial excede o limite máximo.

/**
 * @title GoHorse Token (GOHO)
 * @author https://github.com/dev-araujo
 * @notice Implementação de um token ERC20 para o projeto GoHorse.
 * @dev Utiliza a biblioteca OpenZeppelin para implementação do padrão ERC20.
 */

contract GoHorse is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 5000 * 10 ** 18;
    string private s_metadataUrl;
    uint256 private s_totalMinted;

    /**
     * @notice Construtor do contrato do token.
     * @param initialSupply Quantidade inicial de tokens a serem mintados.
     * @param metadataUrl URL de metadados do token.
     */
    constructor(
        uint256 initialSupply,
        string memory metadataUrl
    ) ERC20("Go Horse", "GOHO") Ownable(msg.sender) {
        if (initialSupply > MAX_SUPPLY) {
            revert InvalidInitialSupply();
        }
        s_metadataUrl = metadataUrl;
        _mint(msg.sender, initialSupply * 10 ** decimals());
        s_totalMinted = initialSupply * 10 ** decimals();
    }

    /**
     * @notice Mintagem de novos tokens.
     * @dev Apenas o proprietário pode mintar novos tokens.
     * @param to Endereço que receberá os tokens.
     * @param amount Quantidade de tokens a serem mintados.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        if (s_totalMinted + amount > MAX_SUPPLY) {
            revert ExceedsMaxSupply();
        }
        _mint(to, amount);
        s_totalMinted += amount;
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
}
