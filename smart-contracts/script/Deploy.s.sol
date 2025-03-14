// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/GoHorseToken.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        string
            memory metadataUrl = "https://raw.githubusercontent.com/dev-araujo/go-horse-faucet/main/smart-contracts/metadata/gohorse-metadata.json";
        uint256 mintFee = 0.00001 ether; // Taxa de mintagem
        address feeRecipient = msg.sender; // Endereço que receberá a taxa de mintagem

        GoHorse goHorse = new GoHorse(metadataUrl, mintFee, feeRecipient);

        vm.stopBroadcast();

        console.log("GoHorse deployed at:", address(goHorse));
    }
}
