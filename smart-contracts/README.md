
# GoHorse Token (GOHO) 🐴
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">


![Logo GoHorse](../assets/gohorse-pe-de-pano.jpg)

## Descrição 📝

GoHorse Token (GOHO) 🐴 é um token ERC20 construído utilizando o framework Foundry e a biblioteca OpenZeppelin. Este token foi criado como um protótipo inicial para demonstrar a implementação de um token ERC20 com funcionalidades básicas, incluindo cunhagem controlada e um contrato faucet para distribuição inicial. **Embora seja um protótipo, o GoHorse Token tem como objetivo ser implantado na rede principal da Polygon.**

O nome e símbolo do token é uma brincadeira com a metodologia **[eXtreme Go Horse](https://gohorse.com.br/extreme-go-horse-xgh.html)**

Este repositório contém dois contratos Solidity:

- **GoHorseToken.sol**: Implementação do token ERC20 GoHorse.
- **GoHorseFaucet.sol**: Contrato faucet para distribuir tokens GOHO gratuitamente (limitado a 10 reivindicações).

## Pré-requisitos 🔨

- [Foundry](https://book.getfoundry.sh/) instalado. Foundry é um ambiente de desenvolvimento rápido, portátil e modular para aplicações Solidity.
- [Carteira de Ethereum](https://metamask.io/) (MetaMask, por exemplo) configurada e conectada à rede Polygon desejada (Amoy Testnet para testes ou Mainnet para a rede principal).
- Node.js e npm instalados (opcional, para scripts adicionais).

## Execução Local 👨🏼‍💻

1. **Clone este repositório:**

    ```bash
    git clone https://github.com/dev-araujo/go-horse-faucet
    cd smart-contracts
    ```

2. **Instale as dependências do Foundry:**

    ```bash
    forge install
    ```


3. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis, que são necessárias para a implantação e verificação dos contratos:

    ```env
    PRIVATE_KEY=sua_chave_privada_aqui
    POLYGONSCAN_API_KEY=sua_api_key_do_polygonscan_aqui # Opcional, mas recomendado para verificação
    POLYGON_AMOY_RPC_URL=url_rpc_da_polygon_amoy_aqui
    POLYGON_MAINNET_RPC_URL=url_rpc_da_polygon_mainnet_aqui
    ```


4. **Compile os contratos:**

    ```bash
    forge build
    ```



## Implantação dos Contratos

Utilize o seguinte comando Foundry para implantar os contratos `GoHorseToken` e `GoHorseFaucet`. O script `DeployScript.s.sol` cuidará da implantação na rede configurada:

**Na testnet da Polygon**
```bash
forge script script/DeployScript.s.sol --rpc-url $POLYGON_AMOY_RPC_URL --private-key $PRIVATE_KEY
```

**Na mainnet da Polygon**
```bash
forge script script/DeployScript.s.sol --rpc-url $POLYGON_MAINNET_RPC_URL --private-key $PRIVATE_KEY --broadcast -vvvv
```

> ou se você tiver o **[Make](https://swarnakar-ani24.medium.com/a-noobs-guide-to-using-make-and-writing-makefile-f718135d816b)** instalado você pode executar:

**Para testnet**
```bash
make deploy-testnet
```

**Para mainnet**
```bash
make deploy-mainnet
```

## Uso

### Reivindicar Tokens no Faucet

- Acesse o contrato GoHorseFaucet implantado em um explorador de blocos como o Polygonscan Amoy Testnet Explorer (para a rede de testes Amoy) ou Polygonscan (para a rede principal).
- Conecte sua carteira Ethereum ao explorador de blocos.
- Navegue até a aba "Contrato" e clique em "Escrever Contrato".
- Execute a função `requestTokens` para reivindicar tokens GOHO gratuitos (se ainda houver reivindicações disponíveis). Cada reivindicação concede 1 token GOHO, e o limite total de reivindicações é de 10.

### Interagir com o Contrato GoHorseToken

Você pode interagir diretamente com o contrato `GoHorseToken` utilizando o explorador de blocos ou ferramentas como [Polygonscan](https://polygonscan.com/) ou [Remix](https://remix.ethereum.org/) para:

- Verificar o fornecimento total de tokens GOHO em circulação (`totalSupply`).
- Consultar o saldo de tokens GOHO de qualquer carteira (`balanceOf`).
- Realizar transferências de tokens GOHO para outros endereços (`transfer`, `transferFrom`, `approve`).
- Consultar a URL de metadados do token (`getMetadataUrl`).
- (Apenas Proprietário) Cunhar novas unidades de tokens GOHO (`mintNewTokens`), caso necessário e respeitando o fornecimento máximo.

---

#### Autor 👷

[![linkedin](https://media.licdn.com/dms/image/v2/D4D03AQGRDOBRW1cYgA/profile-displayphoto-shrink_200_200/B4DZN3t6VvHQAY-/0/1732880345005?e=1743033600&v=beta&t=0oJW8bm6Mkjj7iC4s5aVe8Tvh63kQwXItyI4ElUAv_o)](https://www.linkedin.com/in/araujocode/)

[Adriano P Araujo](https://www.linkedin.com/in/araujocode/)