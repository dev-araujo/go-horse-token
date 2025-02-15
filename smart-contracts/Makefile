# Makefile para deploy de contratos na Polygon Amoy (testnet) e Polygon Mainnet

# Variáveis de ambiente
ENV_FILE := .env
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

# Contratos
CONTRACTS := GoHorse GoHorseFaucet

# Comandos do Foundry
FORGE := forge
SCRIPT := script/Deploy.s.sol

# Redes
TESTNET := polygon_amoy
MAINNET := polygon_mainnet

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
	$(FORGE) script $(SCRIPT) --rpc-url $(TESTNET) --broadcast --verify -vvvv

# Faz o deploy na Polygon Mainnet
deploy-mainnet:
	@echo "Fazendo deploy na Polygon Mainnet..."
	$(FORGE) script $(SCRIPT) --rpc-url $(MAINNET) --broadcast --verify -vvvv

# Verifica os contratos na Polygon Amoy (testnet)
verify-testnet:
	@echo "Verificando contratos na Polygon Amoy (testnet)..."
	$(FORGE) verify-contract --chain $(TESTNET) --constructor-args $(cast abi-encode "constructor(uint256)" 1000) $(shell jq -r '.deployments["$(TESTNET)"].GoHorse' broadcast/Deploy.s.sol/*/run-latest.json) src/GoHorse.sol:GoHorse
	$(FORGE) verify-contract --chain $(TESTNET) --constructor-args $(cast abi-encode "constructor(address)" $(shell jq -r '.deployments["$(TESTNET)"].GoHorse' broadcast/Deploy.s.sol/*/run-latest.json)) $(shell jq -r '.deployments["$(TESTNET)"].GoHorseFaucet' broadcast/Deploy.s.sol/*/run-latest.json) src/GoHorseFaucet.sol:GoHorseFaucet

# Verifica os contratos na Polygon Mainnet
verify-mainnet:
	@echo "Verificando contratos na Polygon Mainnet..."
	$(FORGE) verify-contract --chain $(MAINNET) --constructor-args $(cast abi-encode "constructor(uint256)" 1000) $(shell jq -r '.deployments["$(MAINNET)"].GoHorse' broadcast/Deploy.s.sol/*/run-latest.json) src/GoHorse.sol:GoHorse
	$(FORGE) verify-contract --chain $(MAINNET) --constructor-args $(cast abi-encode "constructor(address)" $(shell jq -r '.deployments["$(MAINNET)"].GoHorse' broadcast/Deploy.s.sol/*/run-latest.json)) $(shell jq -r '.deployments["$(MAINNET)"].GoHorseFaucet' broadcast/Deploy.s.sol/*/run-latest.json) src/GoHorseFaucet.sol:GoHorseFaucet

# Limpa os arquivos gerados
clean:
	@echo "Limpando arquivos gerados..."
	rm -rf out broadcast cache