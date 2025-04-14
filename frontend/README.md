# GoHorse Token (GOHO) - Frontend 🐴

[![License: MIT](https://img.shields.io/badge/License-MIT-5965E0.svg?labelColor=121214&style=for-the-badge)](https://opensource.org/licenses/MIT)

![pé de pano](../assets/gohorse-pe-de-pano.jpg)

Esta é a aplicação frontend para interagir com o token GoHorse (GOHO), um token ERC20 implantado na rede Polygon. A aplicação permite aos usuários conectar suas carteiras, visualizar informações sobre o token e mintar novos tokens GOHO (sujeito a uma taxa).

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 19.0.2.

## Visão Geral

A aplicação serve como uma interface para o contrato inteligente do GoHorse Token, fornecendo funcionalidades como:

- **Mintagem de Tokens:** Permite que usuários mintem novos tokens GOHO diretamente para suas carteiras conectadas, pagando a taxa de mintagem definida no contrato.
- **Informações do Token:** Exibe detalhes atuais do token, como nome, símbolo, suprimento total, total mintado e taxa de mintagem.
- **Conexão com Carteira:** Integração com carteiras Ethereum (como MetaMask) para permitir interações com a blockchain Polygon.
- **Sobre o Projeto:** Uma seção explicando a filosofia "GoHorse" por trás do token (para fins de diversão e aprendizado).

## Tecnologias Utilizadas

- **Framework:** Angular 19+
- **Blockchain Interaction:** Ethers.js v6
- **Estilização:** SCSS
- **Rede Blockchain:** Polygon (Mainnet e/ou Amoy Testnet)
- **SSR:** Angular SSR com Express (configurado, scripts disponíveis)

## Endereço do contrato na polygonscan :

1. **[Amoy Testnet](https://amoy.polygonscan.com/address/0xC7faFBAecD64b1448d9FEf1fF138bF1b08cf943b)**

2. **[Polygon Mainnet](https://polygonscan.com/address/0x7B7758077e51Bc1Be499eF9180f82E16019065cD)**

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm (geralmente vem com o Node.js)
- [Angular CLI](https://angular.dev/tools/cli) (v19.0.2 ou compatível): `npm install -g @angular/cli` (opcional, pode usar `npx`)
- Uma carteira de navegador compatível com Ethereum (ex: MetaMask) configurada para a rede Polygon (Mainnet ou Amoy).

## Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/dev-araujo/go-horse-token.git
    cd frontend
    ```
2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Executando:**

> ⚠️ Não esqueça de rodar o backend antes de executar front, [instruções aqui](../backend/README.md)

```bash
  ng serve
```

ou

```bash
npm run start
```

4. **Acesse a porta 4200**

---

#### Autor 👷

<img src="https://media.licdn.com/dms/image/v2/D4D03AQFdtLzMPGq-iA/profile-displayphoto-shrink_200_200/B4DZXYBptVG8AY-/0/1743086067092?e=1749081600&v=beta&t=f3BTl84h34Tyak_VLwTjwH1ckx1jM_SrC7mGewpzMA4" width=120 />

[Adriano P Araujo](https://www.linkedin.com/in/araujocode/)
