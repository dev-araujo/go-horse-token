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
# O endereço do contrato agora é passado como um argumento para os comandos de verificação
# Exemplo: make verify-amoy CONTRACT_ADDRESS=0x...
CONTRACT_ADDRESS ?= 0xYourContractAddressHere
CONTRACT_NAME := GoHorse
COMPILER_VERSION := $(shell grep 'solidity = "' foundry.toml | sed -n 's/.*"\(.*\)".*/\1/p')

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
# A verificação é tentada automaticamente com --verify
deploy-testnet:
	@echo "Fazendo deploy na Polygon Amoy (testnet)..."
	@echo "Usando RPC URL: $(TESTNET_RPC_URL)"
	$(FORGE) script $(SCRIPT) --rpc-url $(TESTNET_RPC_URL) --broadcast --verify --etherscan-api-key $(POLYGONSCAN_API_KEY) --private-key $(PRIVATE_KEY) -vvvv

# Faz o deploy na Polygon Mainnet
deploy-mainnet:
	@echo "Fazendo deploy na Polygon Mainnet..."
	$(FORGE) script $(SCRIPT) --rpc-url $(MAINNET_RPC_URL) --broadcast --verify --etherscan-api-key $(POLYGONSCAN_API_KEY) --private-key $(PRIVATE_KEY) -vvvv

# Verifica o contrato na Polygon Amoy (verificação manual)
verify-amoy:
	@if [ -z "$(CONTRACT_ADDRESS)" -o "$(CONTRACT_ADDRESS)" = "0xYourContractAddressHere" ]; then \
		echo "Erro: Forneça o endereço do contrato. Uso: make verify-amoy CONTRACT_ADDRESS=0x..."; \
		exit 1; \
	fi
	@echo "Verificando contrato $(CONTRACT_ADDRESS) na Polygon Amoy..."
	$(FORGE) verify-contract \
		--chain-id 80002 \
		--verifier etherscan \
		--verifier-url https://api-amoy.polygonscan.com/api \
		--etherscan-api-key $(POLYGONSCAN_API_KEY) \
		$(CONTRACT_ADDRESS) \
		src/$(CONTRACT_NAME).sol:$(CONTRACT_NAME) \
		--compiler-version $(COMPILER_VERSION) \
		--watch

# Verifica o contrato na Polygon Mainnet (verificação manual)
verify-mainnet:
	@if [ -z "$(CONTRACT_ADDRESS)" -o "$(CONTRACT_ADDRESS)" = "0xYourContractAddressHere" ]; then \
		echo "Erro: Forneça o endereço do contrato. Uso: make verify-mainnet CONTRACT_ADDRESS=0x..."; \
		exit 1; \
	fi
	@echo "Verificando contrato $(CONTRACT_ADDRESS) na Polygon Mainnet..."
	$(FORGE) verify-contract \
		--chain-id 137 \
		--verifier etherscan \
		--verifier-url https://api.polygonscan.com/api \
		--etherscan-api-key $(POLYGONSCAN_API_KEY) \
		$(CONTRACT_ADDRESS) \
		src/$(CONTRACT_NAME).sol:$(CONTRACT_NAME) \
		--compiler-version $(COMPILER_VERSION) \
		--watch