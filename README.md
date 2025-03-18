# Go Horse Token e Faucet 🐴

![Pé de pano - go horse](./assets/gohorse-pe-de-pano.jpg)

O nome e símbolo do token é uma brincadeira com a metodologia **[eXtreme Go Horse](https://gohorse.com.br/extreme-go-horse-xgh.html)**

GoHorse Token (GOHO) 🐴 é um token **ERC20** construído utilizando **Solidity** com o framework **Foundry** e a biblioteca **OpenZeppelin**. Com as funcionalidades:

1. Cunhagem pública: Qualquer pessoa pode mintar tokens, desde que pague uma taxa de mintagem simbólica (algo entre 11 centavos). Essa taxa é enviada para um endereço específico (feeRecipient), que pode ser configurado pelo proprietário do contrato.
2. Controle de suprimento máximo: O contrato garante que o total de tokens mintados não exceda o suprimento máximo definido (MAX_SUPPLY).
3. Taxa de mintagem ajustável: O proprietário do contrato pode atualizar a taxa de mintagem (mintFee) e o endereço que recebe as taxas (feeRecipient).

**Embora seja um protótipo, o GoHorse Token tem como objetivo ser implantado na rede principal da Polygon.**

## Endereço do contrato na polygonscan :

**Amoy Testnet** : https://amoy.polygonscan.com/address/0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b

**Polygon Mainnet** : Em breve...

Essa aplicação será uma aplicação **fullstack web3** onde se utilizará:

1. **Solidity** com o framework **Foundry** - Para os smart contracts
2. **Node.js** - para uma api
3. Uma interface para faucet com **Angular**

## Progresso 🐎

- [x] Criação dos smart contracts

- [x] Testes dos smart contracts na Testnet **[Estamos aqui]**
- [x] Criação do backend (?)
- 🏇 Crição da interface
- [ ] Implantação dos smart contracts na mainnet 🤠
- [ ] Adaptação da faucet do consumo da testnet para mainnet

## Documentação

- [Smarts contracts](./smart-contracts/)
- [Backend](./backend/)
- [Frontend]() - Em breve
