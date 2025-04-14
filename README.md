# Go Horse Token (GOHO) 🐴

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214)](https://opensource.org/licenses/MIT)

Bem-vindo ao projeto **Go Horse Token (GOHO)**! Este repositório contém todos os componentes necessários para implantar, interagir e gerenciar o **GOHO**, um token **ERC20** na rede **Polygon**, inspirado na filosofia "eXtreme Go Horse" para fins de aprendizado e diversão.

O projeto é dividido em três partes principais:

1.  **Smart Contracts:** O núcleo do token, implementado em **Solidity** usando **Foundry** e **OpenZeppelin**. Define as regras do token GOHO, incluindo suprimento máximo, mintagem com taxa e funções administrativas.
2.  **Backend API:** Uma API construída com Node.js e TypeScript que serve como intermediário para interagir com o smart contract na blockchain, expondo endpoints para mintagem e consulta de informações do token.
3.  **Frontend Application:** Uma aplicação Angular que fornece uma interface de usuário para conectar carteiras (como MetaMask), visualizar detalhes do token GOHO e mintar novos tokens diretamente através da interação com a blockchain e/ou backend.

## Visão Geral dos Componentes

- **`/smart-contracts`**: Contém o código Solidity (`GoHorse.sol`), testes, scripts de deploy (Foundry) e metadados do token ERC20.
  - [Detalhes em `/smart-contracts/README.md`](./smart-contracts/README.md)
- **`/backend`**: Contém a API Node.js/TypeScript para interagir com o contrato implantado. Responsável por operações como mintagem (iniciada pelo admin/backend) e leitura de dados da blockchain.
  - [Detalhes em `/backend/README.md`](./backend/README.md)
- **`/frontend`**: Contém a aplicação Angular que permite aos usuários conectar suas carteiras, ver informações do token (suprimento, taxa de mintagem, etc.) e iniciar o processo de mintagem (pagando a taxa necessária).
  - [Detalhes em `/frontend/README.md`](./frontend/README.md)

## Endereços dos Contratos na Polygon

O contrato GoHorse Token (GOHO) está implantado nos seguintes endereços:

1.  **Polygon Amoy Testnet:** [`0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b`](https://amoy.polygonscan.com/address/0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b)
2.  **Polygon Mainnet:** [`0x7B7758077e51Bc1Be499eF9180f82E16019065cD`](https://polygonscan.com/address/0x7B7758077e51Bc1Be499eF9180f82E16019065cD)

## Tecnologias Utilizadas

- **Smart Contracts:**
  - Solidity
  - Foundry (Framework de desenvolvimento/teste/deploy)
  - OpenZeppelin Contracts (Padrões ERC20 e segurança)
- **Backend:**
  - Node.js
  - TypeScript
  - Ethers.js (Interação com Blockchain)
- **Frontend:**
  - Angular (v19+)
  - TypeScript
  - Ethers.js v6 (Interação com Blockchain via carteira do usuário)
  - SCSS
- **Blockchain:**
  - Polygon (Mainnet & Amoy Testnet)

## Começando (Ambiente Local)

Siga estas etapas para configurar e executar o projeto completo localmente.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (Versão LTS ou v12+ conforme indicado nos subprojetos)
- [npm](https://www.npmjs.com/) (geralmente incluído com Node.js)
- [Foundry](https://book.getfoundry.sh/) (Necessário para compilar/testar/deployar os smart contracts)
- Uma carteira de navegador compatível com Ethereum (ex: [MetaMask](https://metamask.io/)) configurada para a rede Polygon (Amoy para testes, Mainnet para produção).
- [Angular CLI](https://angular.dev/tools/cli) (Opcional, pode usar `npx`): `npm install -g @angular/cli`

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/dev-araujo/go-horse-token.git
    cd go-horse-token
    ```

2.  **Instale as dependências para cada componente:**
    Navegue até cada diretório e instale suas dependências específicas:

    ```bash
    # Para o Backend
    cd backend
    npm install
    cd ..

    # Para o Frontend
    cd frontend
    npm install
    cd ..

    # Para os Smart Contracts (usando Foundry)
    cd smart-contracts
    forge install
    cd ..
    ```

3.  **Configuração de Ambiente (.env):**
    Cada componente que interage com a blockchain ou requer chaves privadas precisa de um arquivo `.env`. **Nunca adicione arquivos `.env` ao Git.**

    - **Backend:** Crie um arquivo `backend/.env`. Veja as variáveis necessárias em [`backend/README.md`](./backend/README.md).

    - **Smart Contracts:** Crie um arquivo `smart-contracts/.env`. Veja as variáveis necessárias em [`smart-contracts/README.md`](./smart-contracts/README.md).

### Executando o Projeto

Para executar a aplicação completa localmente, você geralmente precisará iniciar o backend e o frontend. A interação com os smart contracts pode ser feita localmente (via testes/nó local) ou diretamente nas redes de teste/principal.

1.  **Smart Contracts (Opcional Localmente):**

    - Você pode compilar os contratos com `forge build` dentro da pasta `smart-contracts`.
    - Para deploy local ou em testnets/mainnet, siga as instruções em [`smart-contracts/README.md`](./smart-contracts/README.md).

2.  **Executar o Backend:**

    - Navegue até a pasta `backend`.
    - Execute o servidor de desenvolvimento:
      ```bash
      npm run dev
      ```
    - A API estará disponível (geralmente em `http://localhost:PORTA_BACKEND`, verifique o console).

3.  **Executar o Frontend:**
    - **Certifique-se de que o backend está rodando.**
    - Navegue até a pasta `frontend`.
    - Execute a aplicação Angular:
      ```bash
      npm run start
      ```
      ou
      ```bash
      ng serve
      ```
    - Acesse a aplicação no seu navegador, geralmente em `http://localhost:4200`.

## Documentação Detalhada

Para informações mais aprofundadas sobre cada componente, incluindo configuração específica, arquitetura, testes e deploy, consulte os READMEs individuais:

- **Smart Contracts:** [`./smart-contracts/README.md`](./smart-contracts/README.md)
- **Backend:** [`./backend/README.md`](./backend/README.md)
- **Frontend:** [`./frontend/README.md`](./frontend/README.md)

## Autor 👷

<img src="https://media.licdn.com/dms/image/v2/D4D03AQFdtLzMPGq-iA/profile-displayphoto-shrink_200_200/B4DZXYBptVG8AY-/0/1743086067092?e=1749081600&v=beta&t=f3BTl84h34Tyak_VLwTjwH1ckx1jM_SrC7mGewpzMA4" width=120 />

[Adriano P Araujo](https://www.linkedin.com/in/araujocode/)
