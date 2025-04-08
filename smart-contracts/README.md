# GoHorse Token (GOHO) 🐴

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214)](https://opensource.org/licenses/MIT)

## Descrição 📝

**GoHorse Token (GOHO)** é um token ERC20 criado com **Foundry** e **OpenZeppelin**. Serve como protótipo para demonstrar a implementação de um token ERC20 com funcionalidades de mintagem pública, onde qualquer pessoa pode mintar tokens pagando uma taxa simbólica. O nome e símbolo são uma brincadeira com a metodologia _eXtreme Go Horse_.

Este repositório contém o contrato:

- **GoHorseToken.sol**: Implementação do token ERC20 GoHorse com mintagem pública e taxa de mintagem.

## Endereço do contrato na polygonscan :

**Amoy Testnet** : https://amoy.polygonscan.com/address/0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b
**Polygon Mainnet** : Em breve...

## Pré-requisitos 🔨

- [Foundry](https://book.getfoundry.sh/) instalado.
- [Carteira Ethereum](https://metamask.io/) (MetaMask, etc.) configurada (Polygon Amoy Testnet ou Mainnet).

## Execução Local 👨🏼‍💻

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/dev-araujo/go-horse-faucet.git
    cd smart-contracts
    ```

2.  **Instale as dependências:**

    ```bash
    forge install
    ```

3.  **Configure o `.env`:**

    Crie um arquivo `.env` na raiz do projeto. _Não_ adicione este arquivo ao controle de versão.

    ```env
    PRIVATE_KEY=<SUA_CHAVE_PRIVADA>
    POLYGON_AMOY_RPC_URL=<SUA_URL_RPC_AMOY>
    POLYGON_MAINNET_RPC_URL=<SUA_URL_RPC_MAINNET>
    POLYGONSCAN_API_KEY=<SUA_CHAVE_API_ETHERSCAN>  # Opcional, para verificação
    ```

4.  **Compile:**

    ```bash
    forge build
    ```

    ou

    ```bash
    make compile
    ```

## Implantação dos Contratos

**Na testnet da Polygon (Amoy):**

```bash
make deploy-testnet
```

**Na mainnet da Polygon:**

```bash
make deploy-mainnet
```

Alternativamente, use diretamente `forge script`:

```bash
# Testnet
forge script script/Deploy.s.sol --rpc-url $POLYGON_AMOY_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify -vvvv

# Mainnet
forge script script/Deploy.s.sol --rpc-url $POLYGON_MAINNET_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify -vvvv
```

## Uso

Você pode interagir com o contrato `GoHorseToken` implantado usando um explorador de blocos (como Polygonscan) ou ferramentas como Remix:

### Mintagem de Tokens

- **Qualquer pessoa** pode mintar tokens chamando o método `mint`.
- Para mintar, o usuário deve:
  1. Especificar o endereço que receberá os tokens (`to`).
  2. Especificar a quantidade de tokens a serem mintados (`amount`).
  3. Pagar a taxa de mintagem (`mintFee * amount`) em MATIC (ou a moeda nativa da rede).
- A taxa de mintagem é enviada para o endereço `feeRecipient` (configurado no contrato).

---


#### Autor 👷

<img src="https://media.licdn.com/dms/image/v2/D4D03AQFdtLzMPGq-iA/profile-displayphoto-shrink_200_200/B4DZXYBptVG8AY-/0/1743086067092?e=1749081600&v=beta&t=f3BTl84h34Tyak_VLwTjwH1ckx1jM_SrC7mGewpzMA4" width=120 />

[Adriano P Araujo](https://www.linkedin.com/in/araujocode/)
