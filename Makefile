# ====================================================================
# Configurações do Docker
# ====================================================================
DB_CONTAINER=mysql_db       # nome do seu container MySQL no docker-compose
DB_USER=root
DB_PASSWORD=root      # Variável corrigida para ser usada nos comandos
DB_NAME=bd_arsense
SQL_FILE=bd_arsense.sql

# Caminho para os arquivos SQL
bd_arsense=./api/sql/bd_arsense.sql
SEED=./api/sql/seed.sql
functions=./api/sql/funcitons.sql

# Sinalizador para comandos 'docker exec' que não devem exibir a saída do comando em si
.SILENT: reset-schema reset-db seed

# ====================================================================
# Targets
# ====================================================================

# Apaga e recria apenas o schema
# Usa $(DB_CONTAINER) e -p$(DB_PASSWORD)
reset-schema:
	@echo "--- Resetando Apenas o Schema ($(DB_NAME)) ---"
	docker exec -i $(DB_CONTAINER) mysql -u $(DB_USER) -p$(DB_PASSWORD) < $(bd_arsense)
	@echo "Schema resetado com sucesso."

# Apaga e recria o schema e popula com dados iniciais
# Usa $(DB_CONTAINER) e -p$(DB_PASSWORD)
reset-db:

	docker exec -i $(DB_CONTAINER) mysql -u $(DB_USER) -p$(DB_PASSWORD) < $(bd_arsense)
	docker exec -i $(DB_CONTAINER) mysql -u $(DB_USER) -p$(DB_PASSWORD) $(DB_NAME) < $(functions)
	docker exec -i $(DB_CONTAINER) mysql -u $(DB_USER) -p$(DB_PASSWORD) $(DB_NAME) < $(SEED)

# Executa apenas o seed (dados iniciais)
# Usa $(DB_CONTAINER) e -p$(DB_PASSWORD)
seed:
	@echo "--- Executando Seed (dados iniciais) em ($(DB_NAME)) ---"
	docker exec -i $(DB_CONTAINER) mysql -u $(DB_USER) -p$(DB_PASSWORD) $(DB_NAME) < $(SEED)
	@echo "Seed executado com sucesso."

# Comando de ajuda (opcional)
help:
	@echo "Comandos Make disponíveis:"
	@echo "  reset-schema: Apaga e recria apenas a estrutura do banco de dados."
	@echo "  reset-db:     Apaga, recria a estrutura e popula com dados iniciais."
	@echo "  seed:         Executa apenas a população de dados iniciais (seed)."

.PHONY: reset-schema reset-db seed help