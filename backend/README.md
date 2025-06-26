# GO Horse API (GOHO) 🐴

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214&style=for-the-badge)](https://opensource.org/licenses/MIT)

![pé de pano](../assets/gohorse-pe-de-pano.jpg)

Essa é uma api feita com **NodeJS** + **TypeScript** para consumir os métodos do contrato [GoHorse](../smart-contracts/), um token ERC20.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js:** Versão 12 ou superior.
- **npm** (gerenciador de pacotes Node.js) ou **yarn** (gerenciador de pacotes alternativo).

## Endereço do contrato na polygonscan :

1. **[Amoy Testnet](https://amoy.polygonscan.com/address/0x674ef763774479234F77b424D015Fc105397f7Ff)**

2. **[Polygon Mainnet](https://polygonscan.com/address/0x7B7758077e51Bc1Be499eF9180f82E16019065cD)**

## Execução Local 👨🏼‍💻

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/dev-araujo/go-horse-token.git
    cd backend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o `.env`:**

    Crie um arquivo `.env` na raiz do projeto. _Não_ adicione este arquivo ao controle de versão.

    ```env
    PRIVATE_KEY=<SUA_CHAVE_PRIVADA>
    RPC_URL=<SUA_URL_RPC>
    TOKEN_ADDRESS=<ENDEREÇO_DO_DEPLOY_DO_CONTRATO_NA_POLYGON_MAINNET>
    ```

4.  **Executando:**

    ```bash
    npm run dev
    ```

## Rotas 🎯

### 1. **Mint Tokens**

- **Descrição**: Mint novos tokens para um endereço específico.
- **Método**: `POST`
- **Endpoint**: `/token/mint`
- **Parâmetros**:
  - `to` (string): Endereço que receberá os tokens.
  - `amount` (number): Quantidade de tokens a serem mintados.
- **Exemplo de Requisição**:

  ```json
  {
    "to": "0xEnderecoDestino",
    "amount": 100
  }
  ```

- **Resposta de Sucesso**:
  ```json
  {
    "message": "Tokens minted successfully"
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```

---

### 2. **Obter Metadados do Token**

- **Descrição**: Retorna os metadados do token.
- **Método**: `GET`
- **Endpoint**: `/token/metadata`

- **Resposta de Sucesso**:
  ```json
  {
    "url": "[https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true](https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true)",
    "name": "Go Horse",
    "symbol": "GOHO",
    "description": "GOHO token, um token para devs ágeis",
    "image": "[https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true](https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true)",
    "decimals": 18
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```

---

### 3. **Obter Total de Tokens Mintados**

- **Descrição**: Retorna o total de tokens mintados até o momento.
- **Método**: `GET`
- **Endpoint**: `/token/total-minted`
- **Resposta de Sucesso**:
  ```json
  {
    "totalMinted": 0
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```

---

### 4. **Obter Suprimento Máximo de Tokens**

- **Descrição**: Retorna o suprimento máximo de tokens que podem ser mintados.
- **Método**: `GET`
- **Endpoint**: `/token/max-supply`
- **Resposta de Sucesso**:
  ```json
  {
    "maxSupply": 10000000000000000000000
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```

---

### 5. **Obter Taxa de Mintagem**

- **Descrição**: Retorna a taxa de mintagem atual.
- **Método**: `GET`
- **Endpoint**: `/token/mint-fee`
- **Resposta de Sucesso**:
  ```json
  {
    "mintFeePerToken": 0
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```

---

#### Autor 👷

<img src="https://media.licdn.com/dms/image/v2/D4D03AQFdtLzMPGq-iA/profile-displayphoto-shrink_200_200/B4DZXYBptVG8AY-/0/1743086067092?e=1749081600&v=beta&t=f3BTl84h34Tyak_VLwTjwH1ckx1jM_SrC7mGewpzMA4" width=120 />

[Adriano P Araujo](https://www.linkedin.com/in/araujocode/)
