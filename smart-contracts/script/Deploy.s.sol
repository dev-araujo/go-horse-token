// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/GoHorse.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        uint256 mintFee = 0.00001 ether; // Taxa de mintagem simbólica
        address feeRecipient = msg.sender; // Endereço que receberá a taxa de mintagem

        GoHorse goHorse = new GoHorse(mintFee, feeRecipient);

        vm.stopBroadcast();

        console.log("GoHorse deployed at:", address(goHorse));
    }
}
