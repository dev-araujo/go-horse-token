// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/GoHorse.sol";
import "../src/IGoHorse.sol"; // Importe a interface

contract GoHorseTest is Test {
    GoHorse token;
    address owner = address(this);
    address user = address(0x1);
    address feeRecipient = address(0x2);
    uint256 mintFee = 0.1 ether;
    string metadataUrl = "https://example.com/metadata.json";

    function setUp() public {
        token = new GoHorse(metadataUrl, mintFee, feeRecipient);
        vm.deal(user, 10 ether);
    }

    function testInitialState() public view {
        assertEq(token.name(), "Go Horse");
        assertEq(token.symbol(), "GOHO");
        assertEq(token.getMaxSupply(), 10000 * 10 ** 18);
        assertEq(token.mintFee(), mintFee);
        assertEq(token.feeRecipient(), feeRecipient);
        assertEq(token.getMetadataUrl(), metadataUrl);
        assertEq(token.getTotalMinted(), 0);
    }

    function testMintSuccess() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 requiredFee = mintFee * (amount / 10 ** 18);

        vm.prank(user);
        vm.expectEmit(true, true, false, true, address(token));
        emit IGoHorse.FeeTransferred(feeRecipient, requiredFee);
        emit IGoHorse.TokensMinted(user, amount);
        token.mint{value: requiredFee}(user, amount);

        assertEq(token.balanceOf(user), amount);
        assertEq(token.getTotalMinted(), amount);
        assertEq(feeRecipient.balance, requiredFee);
    }

    function testMintInvalidRecipient() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 requiredFee = mintFee * (amount / 10 ** 18);

        vm.prank(user);
        vm.expectRevert("Invalid recipient");
        token.mint{value: requiredFee}(address(0), amount);
    }

    function testMintExceedsMaxSupply() public {
        token.setMintFee(0); // Evita chamada externa
        uint256 amount = 10001 * 10 ** 18;

        vm.prank(user);
        vm.expectRevert(ExceedsMaxSupply.selector);
        token.mint{value: 0}(user, amount);
    }

    function testMintInsufficientFee() public {
        vm.prank(user);
        vm.expectRevert(InsufficientBalance.selector);
        token.mint{value: mintFee - 1}(user, 1 * 10 ** 18);
    }

    function testMintExcessFee() public {
        uint256 amount = 1 * 10 ** 18;
        uint256 requiredFee = mintFee * (amount / 10 ** 18);

        vm.prank(user);
        vm.expectRevert(ExactFeeRequired.selector);
        token.mint{value: requiredFee + 1}(user, amount);
    }

    function testSetMintFee() public {
        uint256 newFee = 0.2 ether;
        token.setMintFee(newFee);
        assertEq(token.mintFee(), newFee);
    }

    function testSetFeeRecipient() public {
        address newRecipient = address(0x3);
        token.setFeeRecipient(newRecipient);
        assertEq(token.feeRecipient(), newRecipient);
    }

    function testSetFeeRecipientInvalid() public {
        vm.expectRevert("Invalid address");
        token.setFeeRecipient(address(0));
    }
}
