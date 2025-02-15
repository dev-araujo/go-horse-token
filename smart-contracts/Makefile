# Makefile para deploy de contratos na Polygon Amoy (testnet) e Polygon Mainnet

# Verifica se o arquivo .env existe
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

# Contratos
CONTRACTS := GoHorse GoHorseFaucet

# Comandos do Foundry
FORGE := forge
SCRIPT := script/Deploy.s.sol

# Redes
TESTNET := $(POLYGON_AMOY_RPC_URL)
MAINNET := $(POLYGON_MAINNET_RPC_URL)

# Comandos
.PHONY: all compile test deploy-testnet deploy-mainnet verify-testnet verify-mainnet clean

all: compile test

# Compila os contratos
compile:
	@echo "Compilando contratos..."
	$(FORGE) build

# Executa os testes
test:
	@echo "Executando testes..."
	$(FORGE) test

# Faz o deploy na Polygon Amoy (testnet)
deploy-testnet:
	@echo "Fazendo deploy na Polygon Amoy (testnet)..."
	$(FORGE) script $(SCRIPT) --rpc-url $(TESTNET) --broadcast --verify --private-key $(PRIVATE_KEY) -vvvv

# Faz o deploy na Polygon Mainnet
deploy-mainnet:
	@echo "Fazendo deploy na Polygon Mainnet..."
	$(FORGE) script $(SCRIPT) --rpc-url $(MAINNET) --broadcast --verify --private-key $(PRIVATE_KEY) -vvvv

# Verifica os contratos na Polygon Amoy (testnet)
verify-testnet:
	@echo "Verificando contratos na Polygon Amoy (testnet)..."
	@LATEST_RUN=$(shell ls -dt broadcast/Deploy.s.sol/* | head -n 1)
	$(FORGE) verify-contract --chain-id 80002 \
		--constructor-args $(shell cast abi-encode "constructor(uint256)" 1000) \
		$(shell jq -r '.transactions[0].contractAddress' $(LATEST_RUN)/run-latest.json) \
		src/GoHorse.sol:GoHorse
	$(FORGE) verify-contract --chain-id 80002 \
		--constructor-args $(shell cast abi-encode "constructor(address)" $(shell jq -r '.transactions[0].contractAddress' $(LATEST_RUN)/run-latest.json)) \
		$(shell jq -r '.transactions[1].contractAddress' $(LATEST_RUN)/run-latest.json) \
		src/GoHorseFaucet.sol:GoHorseFaucet

# Verifica os contratos na Polygon Mainnet
verify-mainnet:
	@echo "Verificando contratos na Polygon Mainnet..."
	@LATEST_RUN=$(shell ls -dt broadcast/Deploy.s.sol/* | head -n 1)
	$(FORGE) verify-contract --chain-id 137 \
		--constructor-args $(shell cast abi-encode "constructor(uint256)" 1000) \
		$(shell jq -r '.transactions[0].contractAddress' $(LATEST_RUN)/run-latest.json) \
		src/GoHorse.sol:GoHorse
	$(FORGE) verify-contract --chain-id 137 \
		--constructor-args $(shell cast abi-encode "constructor(address)" $(shell jq -r '.transactions[0].contractAddress' $(LATEST_RUN)/run-latest.json)) \
		$(shell jq -r '.transactions[1].contractAddress' $(LATEST_RUN)/run-latest.json) \
		src/GoHorseFaucet.sol:GoHorseFaucet

# Limpa os arquivos gerados
clean:
	@echo "Limpando arquivos gerados..."
	rm -rf out broadcast cache