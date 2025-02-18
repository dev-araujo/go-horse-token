// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./GoHorseToken.sol";

error WalletAlreadyClaimed(); /// @notice Erro lançado quando a carteira já reivindicou os tokens gratuitos.
error FreeTokensExhausted(); /// @notice Erro lançado quando todos os tokens gratuitos já foram distribuídos.
error InvalidMintAmount(); ///@notice Erro lançado quando a quantidade de mintagem solicitada é inválida.
error MintingFeeRequired(); ///@notice Erro lançado quando o valor enviado não cobre a taxa de mintagem.

/**
 * @title GoHorse Faucet
 * @author https://github.com/dev-araujo
 * @notice Este contrato distribui tokens GoHorse (GOHO) de forma gratuita para os primeiros usuários e permite a mintagem paga posteriormente.
 */
contract GoHorseFaucet {
    /**
     * @notice Instância do contrato do token GOHO.
     */
    GoHorse private token;

    /**
     * @notice Endereço do proprietário do contrato.
     */
    address private owner;

    /**
     * @notice Número máximo de usuários que podem reivindicar tokens gratuitamente.
     */
    uint256 private constant MAX_FREE_CLAIMERS = 10;

    /**
     * @notice Quantidade de tokens gratuitos distribuídos por usuário.
     */
    uint256 private constant FREE_TOKENS = 1 * 10 ** 18;

    /**
     * @notice Quantidade máxima de tokens que um usuário pode mintar por vez.
     */
    uint256 private constant MAX_MINT_AMOUNT = 10 * 10 ** 18;

    /**
     * @notice Contador de quantas contas já reivindicaram tokens gratuitos.
     */
    uint256 private freeClaimCount = 0;

    /**
     * @notice Mapeia endereços que já reivindicaram tokens gratuitos.
     */
    mapping(address => bool) private hasClaimed;

    /**
     * @notice Evento emitido quando um usuário reivindica tokens.
     * @param user O endereço do usuário que recebeu os tokens.
     * @param amount A quantidade de tokens recebida.
     * @param wasFree Indica se a transação foi gratuita ou paga.
     */
    event TokensClaimed(address indexed user, uint256 amount, bool wasFree);

    /**
     * @notice Construtor do contrato.
     * @param _tokenAddress O endereço do contrato do token GOHO.
     */
    constructor(address _tokenAddress) {
        token = GoHorse(_tokenAddress);
        owner = msg.sender;
    }

    /**
     * @dev Modificador para restringir funções ao proprietário do contrato.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @notice Reivindica um token gratuito, limitado aos primeiros 10 usuários.
     * @dev Cada carteira pode reivindicar apenas uma vez.
     * @dev A função verifica se o usuário já reivindicou e se ainda há tokens gratuitos disponíveis.
     * @dev O contrato do token GOHO precisa permitir a mintagem para o Faucet.
     */
    function claimFreeToken() external {
        if (hasClaimed[msg.sender]) {
            revert WalletAlreadyClaimed();
        }
        if (freeClaimCount >= MAX_FREE_CLAIMERS) {
            revert FreeTokensExhausted();
        }

        hasClaimed[msg.sender] = true;
        freeClaimCount++;
        token.mint(msg.sender, FREE_TOKENS);

        emit TokensClaimed(msg.sender, FREE_TOKENS, true);
    }

    /**
     * @notice Permite que usuários mintem tokens GOHO, até um limite de 10 por vez.
     * @dev O usuário precisa pagar os custos de mintagem.
     * @param amount A quantidade de tokens a serem mintados.
     */
    function mintTokens(uint256 amount) external payable {
        if (amount == 0 || amount > MAX_MINT_AMOUNT) {
            revert InvalidMintAmount();
        }

        uint256 mintCost = getMintingFee(amount);
        if (msg.value < mintCost) {
            revert MintingFeeRequired();
        }

        token.mint(msg.sender, amount);

        emit TokensClaimed(msg.sender, amount, false);
    }

    /**
     * @notice Retorna a taxa necessária para mintar uma determinada quantidade de tokens.
     * @dev A taxa de mintagem é de 10% do valor dos tokens mintados.
     * @param amount A quantidade de tokens a serem mintados.
     * @return O valor necessário para pagar a mintagem.
     */
    function getMintingFee(uint256 amount) public pure returns (uint256) {
        return amount / 10; // 10% do valor dos tokens
    }

    /**
     * @notice Retorna o endereço do contrato do token GOHO associado à faucet.
     * @return O endereço do contrato do token.
     */
    function getTokenAddress() external view returns (address) {
        return address(token);
    }

    /**
     * @notice Permite ao proprietário do contrato sacar os fundos acumulados.
     */
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    /**
     * @dev Função fallback para receber ETH.
     */
    receive() external payable {}
}
