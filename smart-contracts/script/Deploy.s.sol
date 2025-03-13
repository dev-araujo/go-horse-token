// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/GoHorseToken.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        uint256 initialSupply = 1000;
        string
            memory metadataUrl = "https://raw.githubusercontent.com/dev-araujo/go-horse-faucet/main/smart-contracts/metadata/gohorse-metadata.json";
        GoHorse goHorse = new GoHorse(initialSupply, metadataUrl);

        vm.stopBroadcast();

        console.log("GoHorse deployed at:", address(goHorse));
    }
}
