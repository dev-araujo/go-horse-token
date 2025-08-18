# 🐴 Go Horse Token (GOHO) - ERC20 on Polygon

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214&style=for-the-badge)](https://opensource.org/licenses/MIT) ![Polygon](https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white&style=for-the-badge) ![Foundry](https://img.shields.io/badge/Foundry-F5A623?logo=ethereum&logoColor=black&style=for-the-badge)   [![Solidity](https://img.shields.io/badge/Solidity-%20-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/) [![Ethers.js](https://img.shields.io/badge/Ethers.js-%20-204991?style=for-the-badge&logo=ethers&logoColor=white)](https://ethers.io/) [![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-%20-4E5EE4?style=for-the-badge&logo=openzeppelin&logoColor=white)](https://www.openzeppelin.com/)

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 

**O token inspirado na filosofia eXtreme Go Horse!** Um projeto completo de Web3 com smart contracts, API e interface para mintagem de tokens ERC20 na rede Polygon.
Esse projeto visa ser uma brincadeira séria, podendo ou não se desenvolver em projetos paralelos. Para adquirir tokens GOHO acesso nossa plataforma abaixo:


[▶️ Acesse a Interface](https://goho-view.vercel.app/) | [📜 Smart Contract (Mainnet)](https://polygonscan.com/address/0x7B7758077e51Bc1Be499eF9180f82E16019065cD)

![Interface Preview](https://raw.githubusercontent.com/dev-araujo/go-horse-token/refs/heads/main/assets/goho-interface.png)

## 🌟 Features Principais

- **Token ERC20 completo** com mintagem controlada
- **Taxa de mintagem** configurável
- **Dashboard intuitivo** para visualização de saldos e transações
- **Integração direta com MetaMask**
- **API intermediária** para operações seguras

## 🏗️ Arquitetura do Projeto

| Componente         | Tecnologias                     | Descrição                                       |
| ------------------ | ------------------------------- | ----------------------------------------------- |
| **Smart Contract** | Solidity, Foundry, OpenZeppelin | Lógica do token GOHO e regras de mintagem       |
| **Backend API**    | Node.js, TypeScript, Ethers.js  | Ponte segura entre frontend e blockchain        |
| **Frontend**       | Angular 19+, Ethers.js          | Interface para usuários interagirem com o token |

## 📂 Estrutura do Repositório

```
.
├── smart-contracts/   # Contratos, testes e scripts de deploy (Foundry)
│   ├── src/GoHorse.sol
│   ├── test/
│   └── script/
│
├── backend/           # API Node.js/TypeScript
│   ├── src/
│   └── blockchain.config.ts
│
├── frontend/          # Aplicação Angular
│   ├── src/app/
│   └── assets/
│
└── DOC.md             # Guia completo de instalação e execução
```

## 🔗 Contratos Deployados

| Rede                | Endereço do Contrato                                                                                 | Explorer      |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| **Polygon Mainnet** | [`0x7B775...065cD`](https://polygonscan.com/address/0x7B7758077e51Bc1Be499eF9180f82E16019065cD)      | PolygonScan   |
| **Polygon Amoy**    | [`0x674ef...7f7Ff`](https://amoy.polygonscan.com/address/0x674ef763774479234F77b424D015Fc105397f7Ff) | Amoy Explorer |

## 🚀 Começando

Para executar localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/goho-token.git

# 2. Siga os guias específicos de cada componente:
- [Smart Contracts](./smart-contracts/README.md)
- [Backend API](./backend/README.md)
- [Frontend](./frontend/README.md)

# Ou consulte o guia completo em DOC.md

- [DOC](./DOC.md)
```

## 🛠️ Stack

[![Solidity](https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=white&style=for-the-badge)](https://soliditylang.org/) [![Foundry](https://img.shields.io/badge/Foundry-F5A623?logo=ethereum&logoColor=black&style=for-the-badge)](https://getfoundry.sh/) [![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white&style=for-the-badge)](https://angular.io/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/) [![Polygon](https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white&style=for-the-badge)](https://polygon.technology/) [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://nodejs.org/) [![Ethers.js](https://img.shields.io/badge/Ethers.js-3C3C3D?logo=ethereum&logoColor=white&style=for-the-badge)](https://docs.ethers.org/)



## Author 👷

<img src="https://user-images.githubusercontent.com/97068163/149033991-781bf8b6-4beb-445a-913c-f05a76a28bfc.png" width="10%" alt="caricatura do autor desse repositório"/>

**Adriano P Araujo**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white&style=for-the-badge)](https://www.linkedin.com/in/araujocode/) [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge)](https://github.com/seu-usuario)
