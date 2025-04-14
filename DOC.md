## Começando (Ambiente Local)🐴 

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214&style=for-the-badge)](https://opensource.org/licenses/MIT)

![pé de pano](./assets/gohorse-pe-de-pano.jpg)

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
