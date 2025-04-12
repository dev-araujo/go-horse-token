# Verifica se o arquivo .env existe
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

# Comandos do Foundry
FORGE := forge
SCRIPT := script/Deploy.s.sol

# Redes
TESTNET_RPC_URL := $(POLYGON_AMOY_RPC_URL)
MAINNET_RPC_URL := $(POLYGON_MAINNET_RPC_URL)

# Variáveis

CONTRACT_ADDRESS := 0x7B7758077e51Bc1Be499eF9180f82E16019065cD
CONTRACT_NAME := GoHorse

# Comandos
.PHONY: all compile deploy-testnet deploy-mainnet verify-amoy verify-mainnet clean

all: compile

# Compila os contratos
compile:
	@echo "Compilando contratos..."
	$(FORGE) build --build-info

# Limpa o cache e arquivos de build
clean:
	@echo "Limpando arquivos gerados..."
	rm -rf out broadcast cache

# Faz o deploy na Polygon Amoy (testnet)
deploy-testnet:
	@echo "Fazendo deploy na Polygon Amoy (testnet)..."
	$(FORGE) script $(SCRIPT) --rpc-url $(TESTNET_RPC_URL) --broadcast --verify --private-key $(PRIVATE_KEY) -vvvv

# Faz o deploy na Polygon Mainnet
deploy-mainnet:
	@echo "Fazendo deploy na Polygon Mainnet..."
	$(FORGE) script $(SCRIPT) --rpc-url $(MAINNET_RPC_URL) --broadcast --verify --private-key $(PRIVATE_KEY) -vvvv

# Verifica o contrato na Polygon Amoy
verify-amoy:
	@echo "Verificando contrato na Polygon Amoy..."
	$(FORGE) verify-contract \
		--chain-id 80002 \
		--verifier etherscan \
		--verifier-url https://api-amoy.polygonscan.com/api \
		--etherscan-api-key $(POLYGONSCAN_API_KEY) \
		$(CONTRACT_ADDRESS) \
		src/GoHorse.sol:GoHorse \
		--compiler-version "0.8.28" \
		--num-of-optimizations 200 \
		--watch

# Verifica o contrato na Polygon Mainnet
verify-mainnet:
	@echo "Verificando contrato na Polygon Mainnet..."
	$(FORGE) verify-contract \
		--chain-id 137 \
		--verifier etherscan \
		--verifier-url https://api.polygonscan.com/api \
		--etherscan-api-key $(POLYGONSCAN_API_KEY) \
		$(CONTRACT_ADDRESS) \
		src/GoHorse.sol:GoHorse \
		--compiler-version "0.8.28" \
		--num-of-optimizations 200 \
		--watch
