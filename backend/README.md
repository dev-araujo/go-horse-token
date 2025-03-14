# GO Horse API

Essa é uma api feita com **NodeJS** + **TypeScript** + **Café** para consumir os métodos do contrato [GoHorse](../smart-contracts/), um token ERC20.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js:** Versão 12 ou superior.
- **npm** (gerenciador de pacotes Node.js) ou **yarn** (gerenciador de pacotes alternativo).

## Endereço do contrato na polygonscan :

**Amoy Testnet** : https://amoy.polygonscan.com/address/0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b
**Polygon Mainnet** : Em breve...

## Execução Local 👨🏼‍💻

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/dev-araujo/go-horse-faucet.git
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
    POLYGONSCAN_API_KEY=<SUA_CHAVE_API_ETHERSCAN>  # Opcional, para verificação
    TOKEN_ADDRESS=ENDEREÇO_DO_DEPLOY_DO_CONTRATO
    ```

4.  **Executando:**

    ```bash
    npm run dev
    ```

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
    "url": "https://exemplo.com/metadata.json",
    "name": "Go Horse",
    "symbol": "GOHO",
    "description": "GOHO token, um token para devs agéis",
    "image": "https://exemplo.com/imagem.jpg",
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
    "totalMinted": 1000
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
    "maxSupply": 10000
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
    "mintFee": 0.01
  }
  ```
- **Resposta de Erro**:
  ```json
  {
    "error": "Mensagem de erro"
  }
  ```
