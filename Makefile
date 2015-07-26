




BIN := ./node_modules/.bin

JSHINT ?= $(BIN)/jshint
JSHINT_FLAGS ?= --config ~/Code/jshint/global.json




ENGRAM_SERVER ?=  node_modules/engram/es6
ENGRAM_CLIENT ?=  public/javascript/es6









lint:
	@$(JSHINT) $(ENGRAM_SERVER) $(JSHINT_FLAGS)
