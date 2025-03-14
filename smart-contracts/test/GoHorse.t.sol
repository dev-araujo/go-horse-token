// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/GoHorseToken.sol";

contract GoHorseMintTest is Test {
    GoHorse public goHorse;
    address public user = address(0x2);
    address public feeRecipient = address(0x3);
    uint256 public constant MAX_SUPPLY = 10000 * 10 ** 18;
    string public metadataUrl = "https://example.com/metadata.json";
    uint256 public mintFee = 0.00001 ether;

    function setUp() public {
        goHorse = new GoHorse(metadataUrl, mintFee, feeRecipient);

        vm.deal(user, 1 ether);
    }

    /// @notice Testa a mintagem com a taxa correta
    function testMintWithCorrectFee() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 requiredFee = mintFee;

        vm.prank(user);
        goHorse.mint{value: requiredFee}(user, amount);

        assertEq(
            goHorse.balanceOf(user),
            amount,
            "Saldo do usuario deveria ser 1 token"
        );
        assertEq(
            goHorse.getTotalMinted(),
            amount,
            "Total mintado deveria ser 1 token"
        );
        assertEq(
            address(feeRecipient).balance,
            requiredFee,
            "FeeRecipient deveria receber a taxa"
        );
    }

    /// @notice Testa a mintagem com taxa insuficiente
    function testMintWithInsufficientFee() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 insufficientFee = mintFee / 2;

        vm.prank(user);
        vm.expectRevert("Insufficient fee");
        goHorse.mint{value: insufficientFee}(user, amount);
    }

    /// @notice Testa a mintagem de múltiplos tokens
    function testMintMultipleTokens() public {
        uint256 amount = 3 * 10 ** 18;
        uint256 tokenAmount = amount / (10 ** 18);
        uint256 requiredFee = mintFee * tokenAmount;

        vm.prank(user);
        goHorse.mint{value: requiredFee}(user, amount);

        assertEq(
            goHorse.balanceOf(user),
            amount,
            "Saldo do usuario deveria ser 3 tokens"
        );
        assertEq(
            goHorse.getTotalMinted(),
            amount,
            "Total mintado deveria ser 3 tokens"
        );
        assertEq(
            address(feeRecipient).balance,
            requiredFee,
            "FeeRecipient deveria receber a taxa total"
        );
    }

    /// @notice Testa a mintagem excedendo o MAX_SUPPLY
    function testMintExceedsMaxSupply() public {
        uint256 amount = MAX_SUPPLY + 1;
        uint256 tokenAmount = amount / (10 ** 18);
        uint256 requiredFee = mintFee * tokenAmount;

        vm.prank(user);
        vm.expectRevert(ExceedsMaxSupply.selector);
        goHorse.mint{value: requiredFee}(user, amount);
    }

    /// @notice Testa a mintagem com amount não divisível por 10^18
    function testMintWithFractionalAmountReverts() public {
        uint256 amount = 1 * 10 ** 18 + 1;
        uint256 tokenAmount = amount / (10 ** 18);
        uint256 requiredFee = mintFee * tokenAmount;

        vm.prank(user);
        vm.expectRevert("Amount must be a whole number of tokens");
        goHorse.mint{value: requiredFee}(user, amount);
    }

    /// @notice Testa a mintagem com msg.value maior que a taxa necessária
    function testMintWithExcessFee() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 requiredFee = mintFee;
        uint256 excessFee = requiredFee * 2;

        vm.prank(user);
        goHorse.mint{value: excessFee}(user, amount);

        assertEq(
            goHorse.balanceOf(user),
            amount,
            "Saldo do usuario deveria ser 1 token"
        );
        assertEq(
            goHorse.getTotalMinted(),
            amount,
            "Total mintado deveria ser 1 token"
        );
        assertEq(
            address(feeRecipient).balance,
            excessFee,
            "FeeRecipient deveria receber todo o msg.value"
        );
    }
}
