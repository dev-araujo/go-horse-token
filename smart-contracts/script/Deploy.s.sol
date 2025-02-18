// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/GoHorseToken.sol";
import "../src/GoHorseFaucet.sol";

/**
 * @title DeployScript
 * @author
 * @notice Script para implantar os contratos GoHorseToken e GoHorseFaucet.
 */
contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        uint256 initialSupply = 1000;
        string
            memory metadataUrl = "https://raw.githubusercontent.com/dev-araujo/go-horse-faucet/refs/heads/main/smart-contracts/metadata/gohorse-metadata.json";
        GoHorse goHorse = new GoHorse(initialSupply, metadataUrl);
        address goHorseAddress = address(goHorse);

        GoHorseFaucet faucet = new GoHorseFaucet(goHorseAddress);

        goHorse.setMinter(address(faucet), true);
        goHorse.mint(address(faucet), 500 * 10 ** 18);

        vm.stopBroadcast();

        console.log("GoHorse deployed at:", goHorseAddress);
        console.log("GoHorseFaucet deployed at:", address(faucet));
    }
}
