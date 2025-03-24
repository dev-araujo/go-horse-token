// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IGoHorse {
    event TokensMinted(address indexed to, uint256 amount);
    event FeeTransferred(address indexed recipient, uint256 amount);
}