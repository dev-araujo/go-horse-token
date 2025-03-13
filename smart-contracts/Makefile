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

# Comandos
.PHONY: all compile deploy-testnet deploy-mainnet

all: compile

# Compila os contratos
compile:
	@echo "Compilando contratos..."
	$(FORGE) build

# Limpa o cache
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